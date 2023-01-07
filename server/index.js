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

  //Igrač se spaja na novu/postojeću igru
  socket.on("ConnectingToRoom", (igrac) => {
    //Soba u koju se igrač spaja
    socket.join(igrac.roomID);

    //Sprema igrača u sobu
    let postojiSoba = false;
    sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
      if (igrac.roomID == pojedinacnaSobaIgraca[0].roomID) {
        
        pojedinacnaSobaIgraca.push(igrac);
        postojiSoba = true;
      }
    })

    if (postojiSoba == false) {
      sveSobeIgraca.push([igrac]);
    } 
    //Šalje svim igračima u sobi podatke o igračima u toj sobi
    sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
      if (igrac.roomID == pojedinacnaSobaIgraca[0].roomID) {
        socketIO.to(igrac.roomID).emit('ConnectedToRoomResponse', pojedinacnaSobaIgraca);
      }
    })  

    })
  //Kada igrač klikne na start igre, počinje igra
  socket.on("startGame", (roomID) => {
    console.log("Game", roomID);
    socketIO.to(roomID).emit("BacTarget", getRandomArbitrary(2, 3));
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
        let index = sveSobeIgraca.indexOf(pojedinacnaSobaIgraca)
        let tempSoba = pojedinacnaSobaIgraca.filter((igrac) => igrac.socketID !== socket.id)
        
        for (let i = 0; i <= tempSoba.length; i++) {
            pojedinacnaSobaIgraca[i] = tempSoba[i]
            pojedinacnaSobaIgraca.pop()
            if (tempSoba.length == 0) {
              sveSobeIgraca.splice(index, 1)
            }
            //Šalje novu listu igrača svim igračima u sobi
            pojedinacnaSobaIgraca.forEach((igrac) => {
              socketIO.to(igrac.roomID).emit('ConnectedToRoomResponse', pojedinacnaSobaIgraca);
            })
        }
        
      })
      resolve();
    }).then(() => {
      socket.disconnect();
      console.log(sveSobeIgraca)

    })
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
