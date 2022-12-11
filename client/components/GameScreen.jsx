import React from "react";
import { useState, useEffect, useMountEffect } from "react";
import { Button } from "@material-tailwind/react";

const GameScreen = ({ r, kile, buttonAndBacStyle }) => {
  const g_alch = 10.428;
  const [ukupniBAC, setUkupniBAC] = useState(0);
  const [i, setI] = useState(0);
  const [protekloVrijeme, setProtekloVrijeme] = useState(0);

  const shootEvent = () => {
    setUkupniBAC(ukupniBAC + (g_alch / (kile * r)) * 1000);
    setI(i + 1);
    if ((i = 1)) {
      let setTimer = setInterval(() => {
        if (ukupniBAC - (1 / 12) * 0.15 <= 0) {
          setUkupniBAC(0);
        } else {
          setUkupniBAC(ukupniBAC - (1 / 12) * 0.15);
        }
        setProtekloVrijeme(protekloVrijeme + 1);
        if (protekloVrijeme > 10) {
        }
      }, 1000);
      return () => clearInterval(setTimer);
    }
  };

  return (
    <>
      <div className={`${buttonAndBacStyle}`}>
        <Button variant="outlined" color="green" onClick={shootEvent}>
          Šotiraj
        </Button>
        <span>{ukupniBAC}</span>
      </div>
    </>
  );
};

export default GameScreen;
