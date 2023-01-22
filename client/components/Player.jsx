import React from "react";

const Player = ({ igraci, Player1, Player2 }) => {
  return (
    <>
      <div className={`grid grid-cols-${igraci.length}`}>
        {igraci.map((igrac) =>
          igraci.indexOf(igrac) == 0 ? (
            <div key={igrac.socketID}>
              <span>Username: {igrac.userName}</span>
              <Player1 className="h-[200px] w-[200px]" />
            </div>
          ) : (
            <div key={igrac.socketID}>
              <span>Username: {igrac.userName}</span>
              <Player2 className="h-[200px] w-[200px]" />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Player;
