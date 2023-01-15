import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import odmara from "../assets/odmara.svg";
import pije from "../assets/pije.svg";
import { useSelector } from "react-redux";
import Player from "./Player";

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

  const [igraci, setIgraci] = useState([]);
  const [counter, setCounter] = useState(0);

  const getUserInfo = useSelector((state) => state.getUserInfo);
  const { userName, r, kilaza, gameCreator, roomID } = getUserInfo;

  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kilaza * r)) * 1000);
    socket.emit("ShootEvent", "ShootEvent");
    setBrojPica(brojPica + 1);
  };

  const startGameEvent = () => {
    socket.emit("startGame", roomID);
  };

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

  useEffect(() => {
    socket.on("BacTarget", (e) => {
      setCiljaniBAC(e);
      setI(i + 1);
    });

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
            userName: userName,
            BAC: ukupniBAC,
          });
          alert("Kraj igre");
        }
      }, 100);

      return () => clearInterval(setTimer);
    }
  }, []);

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
          {gameCreator ? (
            <Button
              color="green"
              onClick={() => {
                setShowButton("block");
                startGameEvent();
              }}
              className=""
            >
              Pokreni Igru
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
