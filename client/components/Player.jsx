import React from "react";

const Player = ({ igraci }) => {
  return;
  <>
    <div>
      {igraci.map((igrac) => {
        <span key={socketID}>Username: {igrac.userName}</span>;
      })}
    </div>
  </>;
};

export default Player;
