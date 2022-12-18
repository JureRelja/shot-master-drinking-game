import React, { useState, useEffect } from "react";
import Character from "./Character";

const PlayerLobby = ({ socket }) => {
  const [igraci, setIgraci] = useState([]);

  useEffect(() => {
    console.log("Novi igraČ");
    socket.on("ConnectedToGameResponse", (data) =>
      setIgraci([...igraci, data])
    );
  }, [socket, igraci]);

  return (
    <>
      <ul>
        {igraci.length > 0 &&
          igraci.map((igrac) =>
            igrac.userName === localStorage.getItem("userName") ? (
              <li key={igrac.socketID}>{igrac.userName}</li>
            ) : null
          )}
      </ul>
    </>
  );
};
export default PlayerLobby;
