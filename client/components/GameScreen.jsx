import React from "react";
import { useState, useEffect, useMountEffect } from "react";
import { Button } from "@material-tailwind/react";

import PlayerLobby from "./PlayerLobby";

const GameScreen = ({ r, kile, buttonAndBacStyle, socket }) => {
  const g_alch = 10.428;
  const [ukupniBAC, setUkupniBAC] = useState(0); //Level alkohola u krvi igrača
  const [i, setI] = useState(0); //Ako je i=1, igra počinje
  const [poruka, setPoruka] = useState("");
  const [showButton, setShowButton] = useState("hidden");
  const [preostaloVrijeme, setPreostaloVrijeme] = useState(60);
  const [vrijemeUSekundama, setVrijemeUSekundama] = useState(60);
  const [ciljaniBAC, setCiljaniBAC] = useState(0);

  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kile * r)) * 1000);
    //socket.emit("ShootEvent", "ShootEvent");
  };
  // if (ukupniBAC < 2 && ukupniBAC > 1) {
  //   setPoruka("Pomalo rodijače");
  // } else if (ukupniBAC > 4.6) {
  //   setPoruka("Rodijače oš ti zaronit");
  // }

  // useEffect(() => {
  //   // socket.on("BacTarget", (e) => {
  //   //   console.log("Ciljani level alkhola u krvi: ", e);
  //   //   setCiljaniBAC(Math.round(e * 100) / 100);
  //   // });
  //   //socket.on("ConnectedToGameResponse", (data) => setIgraci(data));
  // });

  const startTimerEvent = () => {
    //socket.emit("startGame", "start");
    setI(i + 1);
  };

  useEffect(() => {
    if (i != 0 && preostaloVrijeme >= 0) {
      let setTimer = setInterval(() => {
        if (ukupniBAC - (1 / 120) * 0.15 <= 0) {
          setUkupniBAC(0);
        } else {
          setUkupniBAC(ukupniBAC - (1 / 120) * 0.15);
        }
        setVrijemeUSekundama(Math.trunc(preostaloVrijeme));
        setPreostaloVrijeme(preostaloVrijeme - 0.1);
        if (preostaloVrijeme <= 0.1) {
          // socket.emit("gameEnded", {
          //   userName: localStorage.getItem("userName"),
          //   BAC: ukupniBAC,
          // });
          alert("Kraj igre");
        }
      }, 10);
      return () => clearInterval(setTimer);
    }
  });

  return (
    <>
      <div
        className={`flex h-[100vh] w-[100vw] justify-center ${buttonAndBacStyle}`}
      >
        <PlayerLobby socket={socket} />
        {/* <div
          id="first_player"
          className="flex flex-col justify-center w-[30%] border-red-200"
        >
          <Character socket={socket} />

          <span>{poruka}</span>
        </div> */}
        <Button
          className={`h-[40px] bg-red-900 ${showButton}`}
          onClick={shootEvent}
        >
          Šotiraj
        </Button>
        <div className="flex flex-col justify-evenly">
          <div id="timer">
            <span className="">Timer: {vrijemeUSekundama}</span>
          </div>
          <span>Ciljani level alkohola u krvi: {ciljaniBAC}</span>
          <Button
            color="green"
            onClick={() => {
              setShowButton("block");
              startTimerEvent();
            }}
            className=""
          >
            Start Game
          </Button>
        </div>
        <div
          id="second_player"
          className="flex flex-col justify-center w-[30%]"
        >
          <span>Oponent Took a Shoot</span>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
