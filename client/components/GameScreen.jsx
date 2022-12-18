import React from "react";
import { useState, useEffect, useMountEffect } from "react";
import { Button } from "@material-tailwind/react";
import Character from "./Character";
import odmara from "../assets/odmara.svg";
import pije from "../assets/pije.svg";
import { useSpring, animated } from "react-spring";
import PlayerLobby from "./PlayerLobby";

const Text1 = ({ on }) => {
  const props = useSpring({ opacity: on ? 1 : 0, from: { opacity: 0 } });
  return (
    <animated.div style={props}>
      <img src={pije} className="w-[250px]" />
    </animated.div>
  );
};

const Text2 = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div style={props}>
      <img src={odmara} className="w-[250px] absolute" />
    </animated.div>
  );
};

const GameScreen = ({ r, kile, buttonAndBacStyle, socket }) => {
  const g_alch = 10.428;
  const [ukupniBAC, setUkupniBAC] = useState(0); //Level alkohola u krvi igrača
  const [i, setI] = useState(0); //Ako je i=1, igra počinje
  const [poruka, setPoruka] = useState("");
  const [showButton, setShowButton] = useState("hidden");
  const [preostaloVrijeme, setPreostaloVrijeme] = useState(60);
  const [vrijemeUSekundama, setVrijemeUSekundama] = useState(60);
  const [ciljaniBAC, setCiljaniBAC] = useState(0);

  const [animationStarted, setAnimationStarted] = useState(false);
  const [on, set] = React.useState(true);

  const startAnimation = () => {
    setAnimationStarted(true);
  };

  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kile * r)) * 1000);
    socket.emit("ShootEvent", "ShootEvent");
  };
  if (ukupniBAC < 2 && ukupniBAC > 1) {
    setPoruka("Pomalo rodijače");
  } else if (ukupniBAC > 4.6) {
    setPoruka("Rodijače oš ti zaronit");
  }

  useEffect(() => {
    socket.on("BacTarget", (e) => {
      console.log("Ciljani level alkhola u krvi: ", e);
      setCiljaniBAC(Math.round(e * 100) / 100);
    });
  });

  const startTimerEvent = () => {
    socket.emit("startGame", "start");
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
          socket.emit("gameEnded", {
            userName: localStorage.getItem("userName"),
            BAC: ukupniBAC,
          });
          alert("Kraj igre");
        }
      }, 10);
      return () => clearInterval(setTimer);
    }
  });

  return (
    <>
      <PlayerLobby socket={socket} />
      <div
        className={`flex h-[100vh] w-[100vw] justify-center ${buttonAndBacStyle}`}
      >
        <PlayerLobby socket={socket} />
        <div
          id="first_player"
          className="flex flex-col justify-center w-[30%] border-red-200"
        >
          <div
            id="character"
            className="relative inline-flex items-center justify-center w-[250px] h-[250px]"
          >
            <Text1 on={on} />
            <Text2 key={on} />
            <button onClick={() => set(!on)}>{on ? "On" : "Off"}</button>
          </div>

          <Button
            className={`h-[40px] bg-red-900 ${showButton}`}
            onClick={() => {
              shootEvent;
              startAnimation;
            }}
          >
            Šotiraj
          </Button>
          <span>{poruka}</span>
        </div>
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
          <span>Preostalo vrijeme: {vrijemeUSekundama}</span>
          <img src={odmara} alt="odmara" className="w-[250px]" />
          <img src={pije} alt="pije" className="w-[250px]" />
          <span>Oponent Took a Shoot</span>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
