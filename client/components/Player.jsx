import React from "react";

const Player = ({ igraci, Player1, Player2 }) => {
  return (
    <div className="h-[94vh] w-[70vw] m-auto grid grid-cols-6 grid-rows-5 gap-[5rem] overscroll-contain text-white">
      {igraci.map((igrac) =>
        igraci.indexOf(igrac) == 0 ? (
          <div
            className="
          col-start-1 col-span-3 
          row-start-2 row-span-3 
          bg-[#FF7C23] 
          grid place-items-center
          shadow-[-0px_0px_50px_0px_rgba(0,0,0)]
          "
            key={igrac.socketId}
          >
            <div className="bg-white text-black -mt-[1.7rem] -ml-5 py-2 px-10 z-30 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] z-5 transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] ">
              <span className="mr-5">{igrac.userName}</span>
              <span>{igrac.bodovi ? igrac.bodovi : 0}</span>
            </div>

            <div className="w-[100%] h-[100%] pt-10">
              <Player1 />
            </div>
          </div>
        ) : (
          <div
            className="
          col-start-4 col-span-3 row-start-2 row-span-3 
          bg-[#FF7C23] z-1
          grid place-items-center
          shadow-[-0px_0px_50px_0px_rgba(0,0,0)]"
            key={igrac.socketId}
          >
            <div className="bg-white text-black -mt-[1.7rem] -ml-5 py-2 px-10 z-30 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] z-5 transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] ">
              <span className="mr-5">{igrac.userName}</span>
              <span>{igrac.bodovi ? igrac.bodovi : 0}</span>
            </div>

            <div className="w-[100%] h-[100%] pt-10">
              <Player2 />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Player;
