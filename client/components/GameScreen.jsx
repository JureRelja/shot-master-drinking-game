import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

const GameScreen = ({ r, kile, buttonAndBacStyle }) => {
  const g_alch = 10.428;
  const [ukupniBAC, setUkupniBAC] = useState(0);
  const [trenutniBAC, setTrenutniBAC] = useState(0);

  const shootEvent = () => {
    setTrenutniBAC((g_alch / (kile * r)) * 1000);
    setUkupniBAC(trenutniBAC + ukupniBAC);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setUkupniBAC(ukupniBAC - (1 / 12) * 0.15);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  let timer = setTimeout(() => {
    setUkupniBAC(ukupniBAC - (1 / 12) * 0.15);
  }, 1000);

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
