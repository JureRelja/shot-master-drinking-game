import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaWeightHanging } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = ({ socket }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  //Podatci koje unosi korisnik
  const [kile, setKile] = useState(0);
  const [r, setR] = useState(0);
  const [userName, setUserName] = useState("");

  let gameCreator = true;

  let roomID = state?.roomID || "";

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
      //Spajanje igrača u sobu
      if (roomID != "") {
        gameCreator = false;
        console.log(gameCreator);
      } else {
        roomID = `${socket.id}${Math.random()}`;
      }
      localStorage.setItem("userName", userName);
      socket.emit("ConnectingToRoom", {
        userName,
        socketID: socket.id,
        gameCreator,
        roomID,
      });
    }
    navigate(`/game?id=${roomID}`, {
      state: {
        userName: userName,
        r: r,
        kile: kile,
        gameCreator: gameCreator,
      },
    });
  };
  return (
    <div id="container" className={`h-[100vh] w-[100vw] flex justify-center`}>
      <div className="bg-black-300 w-[300px] flex flex-col justify-center">
        <form onSubmit={submitEvent} className="flex flex-col items-center">
          <Input
            label="Korisničko ime"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="appearance-none"
          />
          <select
            onChange={handleGender}
            className="mt-3 ml-auto mr-auto bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Odaberi spol</option>
            <option value="Muško">Muško</option>
            <option value="Žensko">Žensko</option>
          </select>
          <Input
            label="Unesi masu u kilogramima"
            type="number"
            onChange={(e) => setKile(e.target.value * 1000)}
            icon={<FaWeightHanging />}
            className="appearance-none"
          />

          <Button type="submit" className="mt-3 ml-auto mr-auto">
            Prijavi se
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
