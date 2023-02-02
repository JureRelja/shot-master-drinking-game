const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const http = require("http").Server(app);
const cors = require("cors");
const e = require("express");

app.use(cors());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "https://drink-master.netlify.app:4000",
  },
});

//Random BAC number generator
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//Insertion sort - finding the winner
function findWinner(individualPlayerRoom) {
  individualPlayerRoom.forEach((player) => {
    let index = individualPlayerRoom.indexOf(player)
    let tempPlayer = individualPlayerRoom[index - 1]
    if (index == 0) {
      return individualPlayerRoom;
    }
    while (player.points > individualPlayerRoom[index - 1].bodovi) {
      individualPlayerRoom[index - 1] = player;
      individualPlayerRoom[index] = tempPlayer;
    }
  }
  )
  return individualPlayerRoom;
}


//List of all curently active players connected to different rooms
let allPlayerRooms = [];

socketIO.on("connection", (socket) => {
  console.log("🔥: A user connected");

  socket.on("userDataLogin", (player) => {
    
    let roomExists = false;
    let numPlayersInRoom = socketIO.sockets.adapter.rooms.get(player.roomID)?.size ?? 0;
    
    if (numPlayersInRoom < 2) {
      //Connceting player to the room
      socket.join(player.roomID);

      //Adding player to the list of players in the room
      allPlayerRooms.forEach((individualPlayerRoom) => {
        if (player.roomID == individualPlayerRoom[0].roomID) {
          individualPlayerRoom.push(player);
          roomExists = true;
        }
      })

      if (roomExists == false) {
        allPlayerRooms.push([player]);    
      }
    }
    //Sends the number of players in the room
    socket.emit('numberOfPlayersInRoom', numPlayersInRoom);
  })

  //Sending the list of players in the room
  socket.on("getPlayersInRoom", (roomID) => {
    allPlayerRooms.forEach((individualPlayerRoom) => {
      if (roomID == individualPlayerRoom[0].roomID) {
        socketIO.to(roomID).emit("playersInRoom", individualPlayerRoom);
      }
    })
  })
   
  //When player press on start game button
  socket.on("startGame", (roomID) => {
    let targetBAC = getRandomArbitrary(2, 3);
    socketIO.to(roomID).emit("gameStarted", Math.round(targetBAC * 100) / 100);
  });

  //Round ended
  socket.on("roundEnded", (player) => {
    allPlayerRooms.forEach((individualPlayerRoom) => {
      if (player.roomID == individualPlayerRoom[0].roomID) {
        individualPlayerRoom.forEach((storedPlayer) => {
          if (storedPlayer.userName == player.userName) {
            storedPlayer.points += player.newPoints;
          }
        })
        socketIO.to(player.roomID).emit("playersInRoom", individualPlayerRoom);
      }
    })
  });

  //Game ended
  socket.on("gameEnded", (roomID) => {
    allPlayerRooms.forEach((individualPlayerRoom) => {
      if (roomID == individualPlayerRoom[0].roomID) {
        let winner = findWinner(individualPlayerRoom);
        socketIO.to(roomID).emit("winner", winner[0]);

      }
    })
  })

  //When player takes a shoot
  socket.on("ShootEvent", (e) => {
    allPlayerRooms.forEach((individualPlayerRoom) => {
      if (e.roomID == individualPlayerRoom[0].roomID) {
        socketIO.to(e.roomID).emit("liftGlass", e.gameCreator);
      }
    })
  });

  //Disconnecting the player from the game
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    //Briše igrača iz sobe
    new Promise((resolve, reject) => {
      allPlayerRooms.forEach((individualPlayerRoom) => {
        individualPlayerRoom.forEach((player) => {
          if (player.socketID == socket.id) {
            //Saving the index of the room in which the player was
            let index = allPlayerRooms.indexOf(individualPlayerRoom);
            //Creating temporary room list without the disconnected player
            let tempRoom = individualPlayerRoom.filter(
              (player) => player.socketID !== socket.id
            );

            //Setting the real list of players in the room to the temporary one
            if (tempRoom.length == 0) {
              allPlayerRooms.splice(index, 1)
            }  
            else {
              for (let i = 0; i < tempRoom.length; i++) {
                individualPlayerRoom[i] = tempRoom[i]
              }
            }
            
            individualPlayerRoom.pop()
            //Sending the new list of players to all active players in the room
            socketIO.to(player.roomID).emit("playersInRoom", individualPlayerRoom);
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
