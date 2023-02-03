import React, { useEffect, useState } from "react";
import GameEnded from "./GameEnded";
import { useSelector } from "react-redux";
import Player from "./Player";
import Player1Riv from "../assets/player1.riv";
import Player2Riv from "../assets/player2.riv";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const GamePage = ({ socket }) => {
  const g_alch = 10.428; //grams of alcohol in one shot

  //If the i=0, the game starts
  const [i, setI] = useState(0);

  //Remmaing game time
  const [remainingTime, setRemainingTime] = useState(60);
  const [timeInSeconds, setTimeInSeconds] = useState(60);

  //BAC level in the blood
  const [targetBAC, setTargetBAC] = useState(0);
  const [totalBAC, setTotalBAC] = useState(0);

  //Number of drinks
  const [numDrniks, setNumDrinks] = useState(0);
  const [points, setPoints] = useState(0);

  const [numRounds, setNumRounds] = useState(0);
  let newPoints = 0;

  //Lifting glass
  const [liftGlass1, setLiftGlass1] = useState(false);
  const [liftGlass2, setLiftGlass2] = useState(false);

  //Cliboard
  const [clipboard, setClipboard] = useState("hidden");

  //Styling states
  const [darken_bg, setDarken_bg] = useState("hidden");
  const [showButton, setShowButton] = useState("hidden");

  //List of players
  const [players, setPlayers] = useState([]);

  //Winner
  const [winner, setWinner] = useState("");

  //User info from redux
  const getUserInfo = useSelector((state) => state.getUserInfo);
  const { userName, r, weight, gameCreator, roomID } = getUserInfo;

  //Rive animations for players lifting glasses
  const PLAYER1_STATE = "player1_drinking";
  const PLAYER2_STATE = "player2_drinking";
  const INPUT_NAME = "Click";

  const { rive, RiveComponent: Player1 } = useRive({
    src: Player1Riv,
    stateMachines: PLAYER1_STATE,
    artboard: "Player1_drinking",
    autoplay: true,
  });

  const { rive: rive2, RiveComponent: Player2 } = useRive({
    src: Player2Riv,
    stateMachines: PLAYER2_STATE,
    artboard: "Player2_drinking",
    autoplay: true,
  });

  const player1Drink = useStateMachineInput(rive, PLAYER1_STATE, INPUT_NAME);
  const player2Drink = useStateMachineInput(rive2, PLAYER2_STATE, INPUT_NAME);

  //Player takes a shot
  const shootEvent = () => {
    setTotalBAC(totalBAC + (g_alch / (weight * r)) * 1000);
    socket.emit("ShootEvent", { roomID, gameCreator });
    setNumDrinks(numDrniks + 1);
  };

  //Starting the game
  const startGameEvent = () => {
    socket.emit("startGame", roomID);
  };

  //Getting active players (every time except the first time)
  useEffect(() => {
    socket.on("playersInRoom", (e) => {
      setPlayers(e);
    });
  }, [socket]);
  //Getting active players (only once)
  useEffect(() => {
    socket.emit("getPlayersInRoom", roomID);
    socket.on("playersInRoom", (e) => {
      setPlayers(e);
    });
  }, []);

  socket.on("liftGlass", (gameCreator) => {
    if (gameCreator) {
      setLiftGlass1(true);
    } else {
      setLiftGlass2(true);
    }
  });

  //End of the game/round
  function gameEnded() {
    let roundedBAC = Math.round(totalBAC * 100) / 100;
    if (Math.abs(roundedBAC - targetBAC) <= 0.1) {
      newPoints = numDrniks * 10;
    } else {
      newPoints = Math.round(
        numDrniks * ((0.1 / Math.abs(roundedBAC - targetBAC)) * 10)
      );
    }
    setPoints(points + newPoints);
    socket.emit("roundEnded", {
      roomID,
      userName,
      newPoints,
    });
    if (numRounds == 2) {
      if (gameCreator) {
        socket.emit("gameEnded", roomID);

        setShowButton("hidden");
        setNumRounds(numRounds + 1);
      }
      socket.on("winner", (e) => {
        setWinner(e.userName);
        setDarken_bg("");
      });
    } else {
      setRemainingTime(60);
      setTimeInSeconds(60);
      setTotalBAC(0);
      setNumDrinks(0);
      setI(i + 1);
      setNumRounds(numRounds + 1);
      setShowButton("hidden");
      alert("End of round!");
    }
  }

  //Main logic of the game for counting down time and calculating BAC of player depending on the elapsed time and number of drinks the player took
  useEffect(() => {
    socket.on("gameStarted", (e) => {
      setTargetBAC(e);
      setI(i + 1);
      setShowButton("block");
      setClipboard("hidden");
    });

    if (liftGlass1) {
      player1Drink.fire();
      setLiftGlass1(false);
    } else if (liftGlass2) {
      player2Drink.fire();
      setLiftGlass2(false);
    }

    if (i % 2 == 1 && remainingTime >= 0) {
      let setTimer = setInterval(() => {
        if (totalBAC - (1 / 120) * 0.15 <= 0) {
          setTotalBAC(0);
        } else {
          setTotalBAC(totalBAC - (1 / 120) * 0.15);
        }
        setTimeInSeconds(Math.trunc(remainingTime));
        setRemainingTime(remainingTime - 0.1);
        if (remainingTime <= 0.1) {
          gameEnded();
        }
      }, 100);

      return () => clearInterval(setTimer);
    }
  });

  return (
    <>
      <div className="bg-[url('../assets/bg-image.png')] h-[100vh] grid place-items-center">
        <div className="h-[94vh] w-[70vw] m-auto grid grid-cols-6 grid-rows-5 gap-[5rem] overscroll-contain text-white place-items-center">
          {/* RoomID */}
          <div
            className="
              h-[40px] w-[450px]
              col-start-2 col-span-4 row-start-1 row-span-1  
              bg-[#FECB63] z-10
              grid place-items-center
              border-black border-2 shadow-[0px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
              hover:cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(roomID);
              setClipboard("");
            }}
          >
            RoomID:
            {roomID}
            <span className={`mt-5 text-white ${clipboard}`}>
              RoomID coppied to clipboard!
            </span>
          </div>

          {/*Black overlay*/}
          <div
            className={`absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-40 backdrop-filter z-30 backdrop-blur-sm  ${darken_bg}`}
          ></div>

          {/*displaying the winner of the game*/}
          {winner != "" ? <GameEnded winner={winner} /> : null}

          {/*Player object which changes depending on if there is only one player connected or two*/}
          <Player
            players={players}
            Player1={Player1}
            Player2={Player2}
            className="col-start-1 col-span-6 grid place-items-center"
          />

          <div
            className="
              h-[75px] w-[200px] mb-[4rem]
              col-start-3 col-span-2 row-start-2 row-span-1 
              bg-[#FECB63] z-10
              grid place-items-center m-auto
              border-black border-2 shadow-[0px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="text-[20px]">Remmaing time:</h1>
            {timeInSeconds}
          </div>
          <div
            className="
              h-[75px] w-[270px] mb-[4rem]
              col-start-3 col-span-2 row-start-3 row-span-1 
              bg-[#FECB63] z-10
              grid place-items-center m-auto
              
              border-black border-2 shadow-[0px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="text-[20px]">BAC target:</h1>
            {targetBAC}
          </div>

          {/*Changing buttons how the game progresses*/}
          <div className="col-start-3 col-span-2 row-start-4 grid place-items-center">
            <div className="grid gap-2 bg-[#FECB63] py-5 px-10 border-black border-2 place-items-center z-5">
              <button
                className={`py-2 px-5 z-20  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white ${showButton}`}
                onClick={() => {
                  shootEvent();
                }}
              >
                Take a shot
              </button>
              {gameCreator && i == 0 && numRounds != 3 ? (
                <button
                  className="py-2 px-5 z-20  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
                  onClick={() => {
                    startGameEvent();
                  }}
                >
                  Start game
                </button>
              ) : null}
              {gameCreator && i != 0 && i % 2 == 0 && numRounds != 3 ? (
                <button
                  className="py-2 px-5 z-30  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
                  color="green"
                  onClick={() => {
                    startGameEvent();
                  }}
                >
                  Start the next round
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
