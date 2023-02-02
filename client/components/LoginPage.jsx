import React, { useState } from "react";
import { FaWeightHanging } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleUserInfo } from "../src/actions";
import { GrFormClose } from "react-icons/gr";

const LoginPage = ({ socket, setDarken_bg, setShowForm, gameCreator }) => {
  const navigate = useNavigate();

  //Data the the user will input
  const [weight, setWeight] = useState(0);
  const [r, setR] = useState(0);
  const [userName, setUserName] = useState("");
  const [roomID, setRoomID] = useState("");

  const dispatch = useDispatch();

  const handleGender = (e) => {
    if (e.target.value === "male") {
      setR(0.68);
    } else if (e.target.value === "female") {
      setR(0.55);
    }
    if (roomID == "") {
      setRoomID(socket.id + Math.random());
    }
  };

  const submitEvent = (event) => {
    event.preventDefault();
    if (r == 0 || weight == 0 || userName == "") {
      alert("You must fill all the fields");
    } else {
      socket.emit("userDataLogin", {
        userName,
        socketID: socket.id,
        gameCreator,
        roomID,
        points: 0,
      });

      socket.on("numberOfPlayersInRoom", (numPlayersInRoom) => {
        if (numPlayersInRoom < 2) {
          dispatch(handleUserInfo(userName, r, weight, gameCreator, roomID));
          navigate(`/game?id=${roomID}`);
        } else {
          alert("This room is full.");
        }
      });
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
            setShowForm(false);
          }}
        >
          <GrFormClose className="absolute top-4 right-4 h-[30px] w-[30px]" />
        </button>
        <form
          onSubmit={submitEvent}
          className="flex flex-col items-center p-[3.5rem]"
        >
          {!gameCreator && (
            <input
              label="roomID"
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              placeholder="Input RoomID"
              className="w-full px-4 py-2 
            border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
            focus:outline-none focus:outline-0
            "
            />
          )}

          <input
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Input username"
            className="mt-3 w-full px-4 py-2 
            border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
            focus:outline-none focus:outline-0
            "
          />
          <input
            label="Weight"
            type="number"
            onChange={(e) => setWeight(e.target.value * 1000)}
            icon={<FaWeightHanging />}
            placeholder="Input your weight in kg"
            className="w-full mt-3 px-4 py-2 
              border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
              focus:outline-none focus:outline-0"
          />
          <select
            onChange={handleGender}
            className="
            w-full px-5 mt-3 bg-gray-50 mb-4  text-gray-900 text-sm block p-2.5
            border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
            "
          >
            <option value="">Choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {gameCreator ? (
            <button
              type="submit"
              className="mt-3 ml-auto mr-auto py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
            >
              Create game
            </button>
          ) : (
            <button
              type="submit"
              className="mt-3 ml-auto mr-auto py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
            >
              Join game
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
