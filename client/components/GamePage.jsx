import React, { useEffect, useState } from "react";
import GameEnded from "./GameEnded";
import { useSelector } from "react-redux";
import Player from "./Player";
import Player1Riv from "../assets/player1.riv";
import Player2Riv from "../assets/player2.riv";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const GamePage = ({ socket }) => {
  const g_alch = 10.428;

  const [i, setI] = useState(0); //Ako je i=1, igra počinje
  const [showButton, setShowButton] = useState("hidden");
  //Preostalo vrijeme igre
  const [preostaloVrijeme, setPreostaloVrijeme] = useState(60);
  const [vrijemeUSekundama, setVrijemeUSekundama] = useState(60);
  //BAC level u krvi
  const [ciljaniBAC, setCiljaniBAC] = useState(0);
  const [ukupniBAC, setUkupniBAC] = useState(0);
  //Number of drinks
  const [brojPica, setBrojPica] = useState(0);
  const [bodovi, setBodovi] = useState(0);

  const [brojRundi, setBrojRundi] = useState(0);
  let noviBodovi = 0;

  //Lifting glass
  const [diziCasu1, setDiziCasu1] = useState(false);
  const [diziCasu2, setDiziCasu2] = useState(false);

  //Cliboard
  const [clipboard, setClipboard] = useState("hidden");

  //List of players
  const [igraci, setIgraci] = useState([]);
  //Styling state
  const [darken_bg, setDarken_bg] = useState("hidden");

  const [winner, setWinner] = useState("");

  const getUserInfo = useSelector((state) => state.getUserInfo);
  const { userName, r, kilaza, gameCreator, roomID } = getUserInfo;

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

  //Igrač pije
  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kilaza * r)) * 1000);
    socket.emit("ShootEvent", { roomID, gameCreator });
    setBrojPica(brojPica + 1);
  };

  //Pokretanje igre
  const startGameEvent = () => {
    socket.emit("pokreniIgru", roomID);
  };

  //Aktvini igrači u sobi
  useEffect(() => {
    socket.on("igraciUSobi", (e) => {
      setIgraci(e);
    });
  }, [socket]);

  //Ažuriranje bodova igrača

  useEffect(() => {
    socket.emit("fetchIgraceUSobi", roomID);
    socket.on("igraciUSobi", (e) => {
      setIgraci(e);
    });
  }, []);

  socket.on("DigniCasu", (gameCreator) => {
    if (gameCreator) {
      setDiziCasu1(true);
    } else {
      setDiziCasu2(true);
    }
    console.log("dosla poruka");
  });

  //Kraj igre/runde
  function krajIgre() {
    let zaokruzeniBAC = Math.round(ukupniBAC * 100) / 100;
    if (Math.abs(zaokruzeniBAC - ciljaniBAC) <= 0.1) {
      noviBodovi = brojPica * 10;
    } else {
      noviBodovi = Math.round(
        brojPica * ((0.1 / Math.abs(zaokruzeniBAC - ciljaniBAC)) * 10)
      );
    }
    setBodovi(bodovi + noviBodovi);
    socket.emit("rundaGotova", {
      roomID,
      userName,
      noviBodovi,
    });
    console.log("2", ukupniBAC);
    console.log(noviBodovi);
    if (brojRundi == 2) {
      if (gameCreator) {
        socket.emit("krajIgre", roomID);

        setShowButton("hidden");
        setBrojRundi(brojRundi + 1);
      }
      socket.on("pobjednik", (e) => {
        alert("Kraj igre, Pobjednik je " + e.userName);
        setWinner(e.userName);
        setDarken_bg("");
      });
    } else {
      setPreostaloVrijeme(60);
      setVrijemeUSekundama(60);
      setUkupniBAC(0);
      setBrojPica(0);
      setI(i + 1);
      setBrojRundi(brojRundi + 1);
      setShowButton("hidden");
      alert("Kraj runde");
    }
  }

  //Ciljani BAC koji igrači trebaju postići
  useEffect(() => {
    socket.on("igraPocela", (e) => {
      setCiljaniBAC(e);
      setI(i + 1);
      setShowButton("block");
    });

    if (diziCasu1) {
      player1Drink.fire();
      setDiziCasu1(false);
    } else if (diziCasu2) {
      player2Drink.fire();
      setDiziCasu2(false);
    }

    if (i % 2 == 1 && preostaloVrijeme >= 0) {
      let setTimer = setInterval(() => {
        if (ukupniBAC - (1 / 120) * 0.15 <= 0) {
          setUkupniBAC(0);
        } else {
          setUkupniBAC(ukupniBAC - (1 / 120) * 0.15);
        }
        setVrijemeUSekundama(Math.trunc(preostaloVrijeme));
        setPreostaloVrijeme(preostaloVrijeme - 0.1);
        if (preostaloVrijeme <= 0.1) {
          krajIgre();
        }
      }, 10);

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
              grid 
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
              Kopirano u clipboard
            </span>
          </div>

          {/*Black overlay*/}
          <div
            className={`absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-40 backdrop-filter z-40 backdrop-blur-sm  ${darken_bg}`}
          ></div>

          {/*displaying the winner of the game*/}
          {winner != "" ? <GameEnded winner={winner} /> : null}

          <Player
            igraci={igraci}
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
            <h1 className="text-[20px]">Preostalo vremena:</h1>
            {vrijemeUSekundama}
          </div>
          <div
            className="
              h-[75px] w-[270px] mb-[4rem]
              col-start-3 col-span-2 row-start-3 row-span-1 
              bg-[#FECB63] z-10
              grid place-items-center m-auto
              
              border-black border-2 shadow-[0px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]"
          >
            <h1 className="text-[20px]">Ciljani level alkohola u krvi:</h1>
            {ciljaniBAC}
          </div>

          <div className="col-start-3 col-span-2 row-start-4 grid place-items-center">
            <div className="grid gap-2 bg-[#FECB63] py-5 px-10 border-black border-2 place-items-center z-5">
              <button
                className={`py-2 px-5 z-30  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white ${showButton}`}
                onClick={() => {
                  shootEvent();
                }}
              >
                Šotiraj
              </button>
              {gameCreator && i == 0 && brojRundi != 3 ? (
                <button
                  className="py-2 px-5 z-30  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
                  onClick={() => {
                    startGameEvent();
                  }}
                >
                  Pokreni Igru
                </button>
              ) : null}
              {gameCreator && i != 0 && i % 2 == 0 && brojRundi != 3 ? (
                <button
                  className="py-2 px-5 z-30  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
                  color="green"
                  onClick={() => {
                    startGameEvent();
                  }}
                >
                  Pokreni sljedeću rundu
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
