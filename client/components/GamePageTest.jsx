import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import odmara from "../assets/odmara.svg";
import pije from "../assets/pije.svg";
import { useSelector } from "react-redux";
import Player from "./Player";
import Player1Riv from "../assets/player1.riv";
import Player2Riv from "../assets/player2.riv";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const GamePageTest = ({ socket }) => {
  const g_alch = 10.428;

  const [i, setI] = useState(0); //Ako je i=1, igra počinje
  const [showButton, setShowButton] = useState("hidden");
  //Preostalo vrijeme igre
  const [preostaloVrijeme, setPreostaloVrijeme] = useState(60);
  const [vrijemeUSekundama, setVrijemeUSekundama] = useState(60);
  //BAC level u krvi
  const [ciljaniBAC, setCiljaniBAC] = useState(0);
  const [ukupniBAC, setUkupniBAC] = useState(0);

  const [brojPica, setBrojPica] = useState(0);
  const [bodovi, setBodovi] = useState(0);

  const [brojRundi, setBrojRundi] = useState(0);
  let noviBodovi = 0;

  const [diziCasu1, setDiziCasu1] = useState(false);
  const [diziCasu2, setDiziCasu2] = useState(false);
  const [igraci, setIgraci] = useState([]);

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

    console.log(
      "1",
      Math.round(brojPica * ((0.1 / Math.abs(zaokruzeniBAC - ciljaniBAC)) * 10))
    );
    setBodovi(bodovi + noviBodovi);
    socket.emit("rundaGotova", {
      roomID,
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
        <div className="h-[94vh] w-[70vw]">
          <div className="grid place-items-center">
            <div className="grid place-items-center bg-[#FECB63] w-[250px] py-3">
              <span>Broj popijenih pića: {brojPica}</span>

              <span>Ciljani level alkohola u krvi: {ciljaniBAC}</span>
              <span>
                <b>{bodovi}</b>
              </span>
              <div id="timer">
                <span>Timer: {vrijemeUSekundama}</span>
              </div>
            </div>
          </div>
          <div className="grid place-items-center">
            <Player igraci={igraci} Player1={Player1} Player2={Player2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePageTest;
