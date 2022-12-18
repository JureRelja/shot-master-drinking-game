const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let igraci = [];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

socketIO.on("connection", (socket) => {
  console.log("🔥: A user connected");

  
  //Igrač se spaja na novu/postojeću igru
  socket.on("connectedToGame", (igrac) => {
    
  igraci.push(igrac)
  //Salje igračima listu igrača spajanje na igru
  socketIO.emit('ConnectedToGameResponse', igraci);
  socket.emit('ConnectedToGameResponse', igrac);
  })
  //Igrač se spaja na postojeću igru
  socket.on("joinnedGame", (igrac) => {
    igraci.push(igrac)
  })
  //Kada igrač klikne na start igre, počinje igra
  socket.on("startGame", (e) => {
    console.log("Game", e);
    socketIO.emit("BacTarget", getRandomArbitrary(2, 3));
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

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Miče igrača iz liste igrača
    igraci = igraci.filter((igrac) => igrac.socketID !== socket.id);
    //Salje igračima listu igrača nakon odspajanja
     socketIO.emit("ConnectedToGameResponse", igraci);

     socket.disconnect();
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
