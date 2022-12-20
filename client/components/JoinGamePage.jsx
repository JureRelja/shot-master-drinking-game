import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinGamePage = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  const handelRoomID = (e) => {
    setRoomID(e.target.value);
    navigate("/game", { state: { roomID: roomID } });
  };

  return (
    <div id="container" className={`h-[100vh] w-[100vw] flex justify-center`}>
      <div className="bg-black-300 w-[300px] flex flex-col justify-center">
        <form onSubmit={submitEvent} className="flex flex-col items-center">
          <Input
            label="roomID"
            type="text"
            onChange={handelRoomID}
            className="appearance-none"
          />
          <Button type="submit" className="mt-3 ml-auto mr-auto">
            Pridruži se Igri
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinGamePage;
