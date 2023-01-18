import React from "react";

const Player = ({ igraci, Player1, Player2 }) => {
  return (
    <>
      <div className="flex justify-evenly">
        {igraci.map((igrac) =>
          igraci.indexOf(igrac) == 0 ? (
            <div key={igrac.socketID}>
              <span>Username: {igrac.userName}</span>
              <Player2 className="h-[350px] w-[350px]" />
            </div>
          ) : (
            <div key={igrac.socketID}>
              <Player1 className="h-[350px] w-[350px]" />
              <span>Username: {igrac.userName}</span>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Player;
