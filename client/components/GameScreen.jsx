import React from "react";
import { useState, useEffect, useMountEffect } from "react";
import { Button } from "@material-tailwind/react";
import Character from "./Character";

const GameScreen = ({ r, kile, buttonAndBacStyle }) => {
  const g_alch = 10.428;
  const [ukupniBAC, setUkupniBAC] = useState(0);
  const [i, setI] = useState(0);
  const [poruka, setPoruka] = useState("");
  const [preostaloVrijeme, setPreostaloVrijem] = useState(0);

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
    if (i != 0 && preostaloVrijeme <= 0) {
      let setTimer = setInterval(() => {
        if (ukupniBAC - (1 / 120) * 0.15 <= 0) {
          setUkupniBAC(0);
        } else {
          setUkupniBAC(ukupniBAC - (1 / 120) * 0.15);
        }
        setPreostaloVrijem(60 - 0.1);
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
            className="h-[40px]"
            variant="outlined"
            color="green"
            onClick={shootEvent}
          >
            Šotiraj
          </Button>
          <span>{poruka}</span>
        </div>
        <div
          id="second_player"
          className="flex flex-col justify-center w-[30%]"
        >
          <span>Preostalo vrijeme: {preostaloVrijeme}</span>
          <Character />
          <span>Oponent Took a Shoot</span>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
