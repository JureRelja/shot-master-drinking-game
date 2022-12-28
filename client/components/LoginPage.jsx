import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaWeightHanging } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { handleUserInfo } from "../src/actions";
import { GrFormClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ socket, setDarken_bg, setShowForm, gameCreator }) => {
  const navigate = useNavigate();
  //Podatci koje unosi korisnik
  const [kile, setKile] = useState(0);
  const [r, setR] = useState(0);
  const [userName, setUserName] = useState("");
  const [roomID, setRoomID] = useState("");

  const getUserInfo = useSelector((state) => state.getUserInfo);
  const dispatch = useDispatch();

  const handleGender = (e) => {
    if (e.target.value === "Muško") {
      setR(0.68);
    } else if (e.target.value === "Žensko") {
      setR(0.55);
    }
  };

  const submitEvent = (event) => {
    event.preventDefault();
    if (r == 0 || kile == 0) {
      alert("Niste unijeli masu ili odabrali spol");
    } else {
      if (gameCreator) {
        setRoomID(`${socket.id}${Math.random()}`);
      }
      if (roomID == "") {
        alert("Niste unijeli ID igre");
      }
      //Spremanje podataka u redux store
      dispatch(handleUserInfo(userName, r, kile, gameCreator, roomID));
      //Slanje podataka serveru
      socket.emit("ConnectingToRoom", {
        userName,
        socketID: socket.id,
        roomID,
        gameCreator,
        r,
        kile,
      });
    }
    navigate(`/game?id=${roomID}`);
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
          <input
            label="Korisničko ime"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Unesi korisničko ime"
            className="w-full px-4 py-2 
            border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)]
            focus:outline-none focus:outline-0
            "
          />
          <input
            label="Masa"
            type="number"
            onChange={(e) => setKile(e.target.value * 1000)}
            icon={<FaWeightHanging />}
            placeholder="Unesi masu u kg"
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
            <option value="">Odaberi spol</option>
            <option value="Muško">Muško</option>
            <option value="Žensko">Žensko</option>
          </select>
          {!gameCreator ? (
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
          ) : null}

          <button
            type="submit"
            className="mt-3 ml-auto mr-auto py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#fd853f] text-white"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
