import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../assets/logo.gif";
import { Input } from "@material-tailwind/react";
import "./main.css";
import { FaWeightHanging } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserLogin from "./UserLogin";

const HomePage = ({ socket }) => {
  const navigate = useNavigate();
  const [gameCreator, setGameCreator] = useState(false);
  const [roomID, setRoomID] = useState("");

  const handleCreateGame = () => {
    setGameCreator(true);
  };

  return (
    <>
      <div
        className={`
        h-[100vh] w-[100vw] grid place-items-center
        bg-[url('../assets/bg-image.png')] bg-center bg-cover`}
      >
        <div className="fixed flex flex-col w-[30px] bg-[#] top-0 left-0">
          Test
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/players.png" alt="" className="h-[90%] w-[90%]" />
          <div
            className="
            mt-3 h-[200px] w-[400px] flex flex-col justify-center items-center
            transition-all duration-[900ms] ease-in-out 
            bg-[#ffffff] bg-opacity-[0.15]
          "
          >
            <button className="bg-white py-2 px-5 place-content-center border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] hover:bg-[#e1b04b]">
              Kreiraj igru
            </button>
            <button className="mt-3 bg-white py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] hover:bg-[#e1b04b]">
              Pridruzi se postojecoj igri
            </button>
          </div>
        </div>
        {/* <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-[10vw] h-[50vh] w-[50vw] ">
          <div></div>
          <div
            className="
            flex flex-col items-center justify-center rounded-lg backdrop-filter backdrop-blur-lg 
            transition-all duration-[900ms] ease-in-out 
            bg-[#2A1711] bg-opacity-60 border-white border-[2px] border-opacity-20
            hover:backdrop-blur-[20px] hover:bg-opacity-70
            shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]
        "
          >
            <img src={logo} alt="logo" className="w-[50%]" />
            <Button
              variant="outlined"
              className="border-[#F99B03] mt-3 border-2 transition-all duration-[400ms] 
              hover:opacity-100 hover:bg-[#F99B03] bg-opacity-90
              text-white"
              onClick={() => {
                navigate("/login");
                handleCreateGame();
              }}
            >
              Create Game
            </Button>
            <Button
              className="mt-3 bg-[#F99B03] shadow-none hover:shadow-none text-white transition-all duration-[400ms]"
              onClick={() => {
                setGameCreator(false);
                navigate("/game");
              }}
            >
              Join Game
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
