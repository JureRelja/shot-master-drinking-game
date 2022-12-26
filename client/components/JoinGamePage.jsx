import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const JoinGamePage = ({ socket }) => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  const handleUserJoin = () => {
    event.preventDefault();
    if (roomID) {
      navigate("/login", { state: { roomID: roomID } });
    } else {
      alert("Morate unijeti ID sobe!");
    }
  };

  return (
    <div
      id="container"
      className={`h-[100vh] w-[100vw] flex justify-center bg-[url(../assets/Ikonice.svg)] bg-cover`}
    >
      <div className="bg-black-300 w-[300px] flex flex-col justify-center">
        <form onSubmit={handleUserJoin} className="flex flex-col items-center">
          <Input
            label="roomID"
            type="text"
            onChange={(e) => setRoomID(e.target.value)}
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
