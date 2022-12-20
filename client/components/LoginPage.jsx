import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaWeightHanging } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleUserInfo } from "../src/actions";

const LoginPage = ({ socket }) => {
  const getUserInfo = useSelector((state) => state.getUserInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [kile, setKile] = useState(0);
  const [r, setR] = useState(0);
  const [userName, setUserName] = useState("");

  const [gameCreator, setGameCreator] = useState(true);

  const kileEvent = (event) => {
    setKile(event.target.value * 1000);
  };

  const userNameEvent = (event) => {
    setUserName(event.target.value);
  };

  const genderEvent = (event) => {
    if (event.target.value == "Žensko") {
      setR(0.55);
    } else if (event.target.value == "Muško") {
      setR(0.68);
    }
  };

  const submitEvent = (event) => {
    event.preventDefault();
    if (r == 0 || kile == 0) {
      alert("Niste unijeli masu ili odabrali spol");
    } else {
      dispatch(handleUserInfo(kile, r, userName));
      localStorage.setItem("userName", userName);
      //Spajanje igrača na server
      socket.emit("connectedToGame", {
        userName,
        socketID: socket.id,
        gameCreator,
        lobbyID: `${socket.id}${Math.random()}`,
      });
      navigate("/test", { state: { userName: userName, r: r, kile: kile } });
      // navigate("/game");
    }
  };
  return (
    <div id="container" className={`h-[100vh] w-[100vw] flex justify-center`}>
      <div className="bg-black-300 w-[300px] flex flex-col justify-center">
        <form onSubmit={submitEvent} className="flex flex-col items-center">
          <Input
            label="Ime"
            type="text"
            value={userName}
            onChange={userNameEvent}
            className="appearance-none"
          />
          <select
            onChange={genderEvent}
            className="mt-3 ml-auto mr-auto bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Odaberi spol</option>
            <option value="Muško">Muško</option>
            <option value="Žensko">Žensko</option>
          </select>
          <Input
            label="Tresi masu"
            type="number"
            onChange={kileEvent}
            icon={<FaWeightHanging />}
            className="appearance-none"
          />
          {getUserInfo.r}
          <Button type="submit" className="mt-3 ml-auto mr-auto">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
