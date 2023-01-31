import React from "react";

function GameEnded({ winner }) {
  return (
    <div
      className={`h-[50px] w-auto flex flex-col p-10 justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0)] border-black border-2 z-50 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#FECB63]`}
    >
      <h2 className="text-[23px]">
        Pobjednik je: <b>{winner}</b>
      </h2>
    </div>
  );
}

export default GameEnded;
