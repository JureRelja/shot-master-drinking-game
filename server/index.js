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

  //Igrač se spaja na novu/postojeću sobu
  socket.on("userDataLogin", (igrac) => {
    

    let postojiSoba = false;
    let brIgracauSobi = socketIO.sockets.adapter.rooms.get(igrac.roomID)?.size ?? 0;
    
    //Šalje broj igrača u sobi
    

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

    socket.emit('BrojIgracaUSobi', brIgracauSobi);
    

        
          
      
      
      // sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
      //   if (igrac.roomID == pojedinacnaSobaIgraca[0].roomID) {   
      //     pojedinacnaSobaIgraca.push(igrac);
      //     console.log("prvo", pojedinacnaSobaIgraca)
      //     postojiSoba = true;
      //     socketIO.to(igrac.roomID).emit('ConnectedToRoomResponse', pojedinacnaSobaIgraca);
      //   }
      // })

      //   if (postojiSoba == false) {
      //     sveSobeIgraca.push([igrac]);
          
      //     if (svePrazno == true) {
      //       sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
      //         if (igrac.roomID == pojedinacnaSobaIgraca[0].roomID) {
      //           console.log("drugo", pojedinacnaSobaIgraca)
      //           socketIO.to(igrac.roomID).emit('ConnectedToRoomResponse', pojedinacnaSobaIgraca);
      //           console.log("drugo", igrac.roomID)
      //         }
      //     })
      //     }
      //   }
      //socketIO.to(igrac.roomID).emit('ConnectedToRoomResponse', sveSobeIgraca);

      
  })

  socket.on("fetchIgraceUSobi", (roomID) => {
    
    sveSobeIgraca.forEach((pojedinacnaSobaIgraca) => {
      if (roomID == pojedinacnaSobaIgraca[0].roomID) {
        socketIO.to(roomID).emit('igraciUSobi', pojedinacnaSobaIgraca);
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
              socketIO.to(igrac.roomID).emit('igraciUSobi', pojedinacnaSobaIgraca);
            })
        }
        
      })
      resolve();
    }).then(() => {
      socket.disconnect();
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
