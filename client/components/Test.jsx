import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";

import Player1Riv from "../assets/player1.riv";
import Player2Riv from "../assets/player2.riv";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const Test = (props) => {
  const getUserInfo = useSelector((state) => state.getUserInfo);

  const { userName, r, kilaza, gameCreator, roomID } = getUserInfo;

  const [showButton, setShowButton] = useState("hidden");

  const PLAYER1_STATE = "player1_drinking";
  const PLAYER2_STATE = "player2_drinking";
  const INPUT_NAME = "Click";

  const { rive, RiveComponent: Player1 } = useRive({
    src: Player1Riv,
    stateMachines: PLAYER1_STATE,
    artboard: "Player1_drinking",
    autoplay: true,
  });

  const { RiveComponent: Player2 } = useRive({
    src: Player2Riv,
    stateMachines: PLAYER2_STATE,
    artboard: "Player2_drinking",
    autoplay: true,
  });

  const player1Drink = useStateMachineInput(rive, PLAYER1_STATE, INPUT_NAME);

  const player2Drink = useStateMachineInput(rive, PLAYER2_STATE, INPUT_NAME);

  return (
    <div className="bg-[url('../assets/bg-image.png')] h-[100vh] grid place-items-center">
      <div className="h-[94vh] w-[90vw] m-auto grid grid-cols-6 grid-rows-5 gap-4 overscroll-contain text-white">
        <div className="absolute w-[100%] h-[100%] z-20"></div>
        <div
          className="
          col-start-1 col-span-3 
          row-start-2 row-span-3 
          bg-[#FF7C23] 
          grid place-items-center
          border-black border-2 shadow-[-5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
          "
        >
          <Player1 />
        </div>
        <div
          className="
      h-[80%] w-[80%] 
      col-start-3 col-span-2 row-start-1 row-span-2 
      bg-[#DF5A00] z-10
      grid place-items-center m-auto
      border-black border-2 shadow-[0px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]"
        >
          Timer
        </div>
        <div
          className="
          col-start-4 col-span-3 row-start-2 row-span-3 
          bg-[#FF7C23] z-1
          grid place-items-center
          border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]"
        >
          <Player2 />
        </div>
        <div className="col-start-3 col-span-2 row-start-4 grid place-items-center">
          <button className="py-2 px-5 z-30  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white">
            Start Game
          </button>
          <Button
            className={`h-[40px] bg-red-900 py-2 px-5 z-30  border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white`}
            onClick={() => {
              player1Drink.fire();
              if (player2Drink) {
                player2Drink.fire();
              }
            }}
          >
            Šotiraj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
