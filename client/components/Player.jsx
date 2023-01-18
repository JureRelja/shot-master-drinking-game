import React from "react";

const Player = ({ igraci, Player1, Player2 }) => {
  return (
    <>
      <div className="flex justify-evenly">
        {igraci.map((igrac) =>
          igraci.indexOf(igrac) == 0 ? (
            <div key={igrac.socketID}>
              <span>Username: {igrac.userName}</span>
              <Player1 />
            </div>
          ) : (
            <div key={igrac.socketID}>
              <span>Username: {igrac.userName}</span>
              <Player2 />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Player;
