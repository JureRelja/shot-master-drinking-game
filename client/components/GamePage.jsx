import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import odmara from "../assets/odmara.svg";
import pije from "../assets/pije.svg";
import { useSelector } from "react-redux";
import Player from "./Player";
import Player1 from "../assets/player1.riv";

import Rive from "@rive-app/react-canvas";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const GamePage = ({ socket }) => {
  const g_alch = 10.428;

  const [i, setI] = useState(0); //Ako je i=1, igra počinje
  const [showButton, setShowButton] = useState("hidden");
  const [showImage, setShowImage] = useState(false);
  //Preostalo vrijeme igre
  const [preostaloVrijeme, setPreostaloVrijeme] = useState(60);
  const [vrijemeUSekundama, setVrijemeUSekundama] = useState(60);
  //BAC level u krvi
  const [ciljaniBAC, setCiljaniBAC] = useState(0);
  const [ukupniBAC, setUkupniBAC] = useState(0);

  const [brojPica, setBrojPica] = useState(0);
  const [bodovi, setBodovi] = useState(0);

  const [brojRundi, setBrojRundi] = useState(0);

  const [igraci, setIgraci] = useState([]);

  const getUserInfo = useSelector((state) => state.getUserInfo);
  const { userName, r, kilaza, gameCreator, roomID } = getUserInfo;

  const STATE_MACHINE_NAME = "player1_drinking";
  const INPUT_NAME = "Click";

  const { rive, RiveComponent: RiveComponentTouch } = useRive({
    src: Player1,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "Player1_drinking",
    autoplay: true,
  });

  const pressedInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );

  //Igrač pije
  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kilaza * r)) * 1000);
    socket.emit("ShootEvent", "ShootEvent");
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
      console.log(e);
      console.log("test");
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("fetchIgraceUSobi", roomID);
    socket.on("igraciUSobi", (e) => {
      setIgraci(e);
      console.log(e);
      console.log("test");
    });
  }, []);

  //Ciljani BAC koji igrači trebaju postići
  useEffect(() => {
    socket.on("igraPocela", (e) => {
      setCiljaniBAC(e);
      setI(i + 1);
      setShowButton("block");
    });

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
          setBodovi(
            bodovi + brojPica * (0.1 / Math.abs(ukupniBAC - ciljaniBAC))
          );
          new Promise((resolve, reject) => {
            socket.emit("rundaGotova", {
              roomID,
              bodovi,
            });
            resolve();
          }).then(() => {});

          if (brojRundi == 3) {
            if (gameCreator) {
              socket.emit("krajIgre", roomID);
            }
            alert("Kraj igre");
          } else {
            alert("Kraj runde");
            console.log(bodovi);
            setPreostaloVrijeme(60);
            setVrijemeUSekundama(60);
            setUkupniBAC(0);
            setBrojPica(0);
            setI(i + 1);
            setBrojRundi(brojRundi + 1);
            setShowButton("hidden");
          }
        }
      }, 10);

      return () => clearInterval(setTimer);
    }
  });

  useEffect(() => {
    if (showImage) {
      const timeoutId = setTimeout(() => {
        setShowImage(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [showImage]);

  return (
    <>
      <div className={`flex h-[100vh] w-[100vw] justify-center`}>
        <div
          id="first_player"
          className="flex flex-col justify-center w-[30%] border-red-200"
        >
          <div
            id="character"
            className="relative inline-flex items-center justify-center w-[250px] h-[250px]"
          >
            {/* <RiveComponentTouch
              className="absolute h-[50vh] w-[70vw]"
              onClick={() => pressedInput.fire()}
            />{" "} */}
            {showImage ? (
              <img src={pije} alt="pije" />
            ) : (
              <img src={odmara} alt="odmara" />
            )}
          </div>
          <Button
            className={`h-[40px] bg-red-900 ${showButton}`}
            onClick={() => {
              shootEvent();
              setShowImage(true);
            }}
          >
            Šotiraj
          </Button>
        </div>
        <div className="flex flex-col justify-evenly">
          <div id="timer">
            <span className="">Timer: {vrijemeUSekundama}</span>
          </div>

          <span className="">Broj popijenih pića: {brojPica}</span>

          <span>Ciljani level alkohola u krvi: {ciljaniBAC}</span>
          {gameCreator && i == 0 && brojRundi != 3 ? (
            <Button
              color="green"
              onClick={() => {
                startGameEvent();
              }}
              className=""
            >
              Pokreni Igru
            </Button>
          ) : null}
          {gameCreator && i != 0 && i % 2 == 0 && brojRundi != 3 ? (
            <Button
              color="green"
              onClick={() => {
                startGameEvent();
              }}
              className=""
            >
              Pokreni sljedeću rundu
            </Button>
          ) : null}
        </div>
        <Player igraci={igraci} />
        <div
          id="second_player"
          className="flex flex-col justify-center w-[30%]"
        >
          <img src={odmara} alt="odmara" className="w-[250px]" />
          <img src={pije} alt="pije" className="w-[250px]" />
          <span>Oponent Took a Shoot</span>
        </div>
      </div>
    </>
  );
};

export default GamePage;
