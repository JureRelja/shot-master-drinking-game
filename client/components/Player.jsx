import React from "react";

const Player = ({ igraci, Player1, Player2 }) => {
  return (
    <div className={`grid grid-cols-2 gap-10 w-[100%] h-[100%]`}>
      {" "}
      {/* ${igraci.length} */}
      {/* {igraci.map((igrac) =>
        igraci.indexOf(igrac) == 0 ? ( */}
      <div>
        {" "}
        {/* key={igrac.socketID} */}
        <button className="text-center -ml-4 bg-white text-black -mb-5 -mt-[1.7rem]  py-2 px-10 z-30 border-black border-2 shadow-[-5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] ">
          igrac.userName
        </button>
        <div className="h-[55vh] w-[100%] pt-10 bg-[#FF7C23] -mt-[10px]">
          <Player1 className="h-[100%] w-[100%]" />
        </div>
      </div>
      {/* ) : ( */}
      <div className="text-right">
        {" "}
        {/*  key={igrac.socketID} */}
        <button className="text-center -mr-4 bg-white text-black -mb-5 -mt-[1.7rem]  py-2 px-10 z-30 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] ">
          igrac.userName
        </button>
        <div className="w-[100%] h-[55vh] pt-10 bg-[#FF7C23] -mt-[10px]">
          <Player2 className="h-[100%] w-[100%]" />
        </div>
      </div>
      {/* )
      )} */}
    </div>
  );
};

export default Player;
