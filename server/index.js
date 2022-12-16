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

let users = [];
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("startGame", (e) => {
    console.log("Game", e);
    socketIO.emit("BacTarget", getRandomArbitrary(2, 3));
  });

  socket.on("ShootEvent", (e) => {
    //Adds the new user to the list of users
    //users.push(data);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);

    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);

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
