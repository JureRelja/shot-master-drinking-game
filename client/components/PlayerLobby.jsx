import React, { useState, useEffect } from "react";
import Character from "./Character";

const PlayerLobby = ({ socket }) => {
  const [igraci, setIgraci] = useState([]);

  useEffect(() => {
    console.log("Novi igraČ");
    socket.on("ConnectedToGameResponse", (data) => setIgraci(data));
  }, [socket, igraci]);

  return (
    <>
      <ul>
        {igraci.length > 0 &&
          igraci.map((igrac) => <li key={igrac.socketID}>{igrac.userName}</li>)}
      </ul>
    </>
  );
};
export default PlayerLobby;
