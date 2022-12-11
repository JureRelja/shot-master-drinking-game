import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import Character from "./Character";

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
          <span>{ukupniBAC}</span>
        </div>
        <div
          id="second_player"
          className="flex flex-col justify-center w-[30%]"
        >
          <Character />
          <span>Oponent Took a Shoot</span>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
