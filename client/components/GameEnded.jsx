import React from "react";

function GameEnded({ winner }) {
  return (
    <div
      className={`h-[200px] w-auto flex flex-col p-10 justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0)] border-black border-2 z-40 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#FECB63]`}
    >
      <h2 className="text-[23px]">
        The winner is: <b>Ane</b>
      </h2>
      <a
        href="/"
        className="py-2 px-5 mt-8 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
      >
        {"<="} Back to homescreen
      </a>
    </div>
  );
}

export default GameEnded;
