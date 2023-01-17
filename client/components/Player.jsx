import React from "react";

const Player = ({ igraci, Player1, Player2 }) => {
  return (
    <>
      <div className="absolute grid place-item-center">
        {igraci.map((igrac) =>
          igraci.indexOf(igrac) == 0 ? (
            <div>
              <span key={igrac.socketID}>Username: {igrac.userName}</span>
              <Player1 />
            </div>
          ) : (
            <div>
              <span key={igrac.socketID}>Username: {igrac.userName}</span>
              <Player2 className={`flex h-[200px] w-[200px] justify-center`} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Player;
