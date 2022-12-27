import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";

const JoinGamePage = ({
  socket,
  setDarken_bg,
  setShowButtons,
  setShowJoin,
}) => {
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
    <>
      <div
        className={`min-h-min min-w-[20vw] flex flex-col justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0)] border-black border-2 z-10 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#FECB63]`}
      >
        <button
          onClick={() => {
            setDarken_bg("hidden");
            setShowButtons("");
            setShowJoin(false);
          }}
        >
          <GrFormClose className="absolute top-4 right-4 h-[30px] w-[30px]" />
        </button>
        <form
          onSubmit={handleUserJoin}
          className="flex flex-col items-center p-[3.5rem]"
        >
          <input
            label="roomID"
            type="text"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            placeholder="Unesi roomID"
            className="w-full px-4 py-2 
            border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
            focus:outline-none focus:outline-0
            "
          />
          <button
            type="submit"
            className="mt-3 ml-auto mr-auto py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
          >
            Pridruži se Igri
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinGamePage;
