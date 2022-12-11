import React from "react";
import { useState, useEffect, useMountEffect } from "react";
import { Button } from "@material-tailwind/react";
import Character from "./Character";

const GameScreen = ({ r, kile, buttonAndBacStyle }) => {
  const g_alch = 10.428;
  const [ukupniBAC, setUkupniBAC] = useState(0);
  const [i, setI] = useState(0);
  const [poruka, setPoruka] = useState("");
  const [showButton, setShowButton] = useState("hidden");
  const [preostaloVrijeme, setPreostaloVrijeme] = useState(60);
  const [vrijemeUSekundama, setVrijemeUSekundama] = useState(60);

  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kile * r)) * 1000);
    setI(i + 1);
    if (ukupniBAC < 2 && ukupniBAC > 1) {
      setPoruka("Pomalo rodijače");
    } else if (ukupniBAC > 4.6) {
      setPoruka("Rodijače oš ti zaronit");
    }
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
      }, 100);
      return () => clearInterval(setTimer);
    }
  });

  return (
    <>
      <div
        className={`flex h-[100vh] w-[100vw] justify-center ${buttonAndBacStyle}`}
      >
        <div
          id="first_player"
          className="flex flex-col justify-center w-[30%] border-red-200"
        >
          <Character />
          <Button
            className={`h-[40px] ${showButton}`}
            variant="outlined"
            color="green"
          >
            Šotiraj
          </Button>
          <span>{poruka}</span>
        </div>
        <div className="flex flex-col justify-evenly">
          <div id="timer">
            <span className="">Timer</span>
          </div>
          <Button
            color="green"
            onClick={() => {
              setShowButton("block");
              shootEvent;
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
          <Character />
          <span>Oponent Took a Shoot</span>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
