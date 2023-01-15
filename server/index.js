const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");
const e = require("express");

app.use(cors());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

//Nasumični BAC broj
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let sveSobeIgraca = [];

socketIO.on("connection", (socket) => {
  console.log("🔥: A user connected");

  socket.on("userDataLogin", (igrac) => {
    
    let postojiSoba = false;
    let brIgracauSobi = socketIO.sockets.adapter.rooms.get(igrac.roomID)?.size ?? 0;
    
    if (brIgracauSobi < 2) {
      //Dodaje igrača u sobu
      socket.join(igrac.roomID);

      //Dodaje igrača u listu igrača
      sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
        if (igrac.roomID == pojedinacnaSobaIgraca[0].roomID) {   
          pojedinacnaSobaIgraca.push(igrac)
          postojiSoba = true;
        }
      })

      if (postojiSoba == false) {
        sveSobeIgraca.push([igrac]);    
      }
    }
    //Šalje broj igrača u sobi 
    socket.emit('BrojIgracaUSobi', brIgracauSobi);
  })

  //Šalje listu igrača u sobi
  socket.on("fetchIgraceUSobi", (roomID) => {
    sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
      if (roomID == pojedinacnaSobaIgraca[0].roomID) {
        socketIO.to(roomID).emit('igraciUSobi', pojedinacnaSobaIgraca);
      }
    })
  })
   
  //Kada igrač klikne na start igre, počinje igra
  socket.on("startGame", (roomID) => {
    let BacTarget = getRandomArbitrary(2, 3);
    socketIO.to(roomID).emit("BacTarget", Math.round(BacTarget * 100) / 100);
  });

  //Kraj igre
  socketIO.on("gameEnded", (e) => {
    console.log("Pobjednik je", e.userName);
    console.log("BAC", e.BAC);
  });

  //Kada igrač klikne na Šotiraj
  socketIO.on("ShootEvent", (e) => {
    socketIO.emit("newUserResponse", users);
  });

  //Odspajanje igrača
  socket.on("disconnect", () => {
    //console.log(sveSobeIgraca)
    console.log("🔥: A user disconnected");

    //Briše igrača iz sobe
    new Promise((resolve, reject) => {
      sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
        pojedinacnaSobaIgraca.forEach((igrac) => {
          if (igrac.socketID == socket.id) {
            //Sprema index sobe iz koje se igrač odspojio
            let index = sveSobeIgraca.indexOf(pojedinacnaSobaIgraca)
            //Stvara privremenu sobu bez igrača koji se odspojio
            let tempSoba = pojedinacnaSobaIgraca.filter((igrac) => igrac.socketID !== socket.id)
            
            //Postavlja stvarnu listu igrača u sobi da je jednaka privremenoj sobi
            for (let i = 0; i < tempSoba.length; i++) {
                pojedinacnaSobaIgraca[i] = tempSoba[i]
                if (tempSoba.length == 0) {
                  sveSobeIgraca.splice(index, 1)
                }  
            }
            pojedinacnaSobaIgraca.pop()
            //Šalje novu listu igrača svim igračima u sobi
            socketIO.to(igrac.roomID).emit('igraciUSobi', pojedinacnaSobaIgraca);
          }
        })   
      })
      resolve();
    }).then(() => {
      socket.disconnect();
    });
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
