import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../assets/logo.gif";
import { Input } from "@material-tailwind/react";
import "./main.css";
import { FaWeightHanging } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = ({ socket }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* {startGame && (
        <GameScreen
          r={r}
          kile={kile}
          buttonAndBacStyle={buttonAndBacStyle}
          socket={socket}
          gameCreator={gameCreator}
        />
      )} */}
      <div
        className={`
        h-[100vh] w-[100vw] 
        flex justify-center items-center 
        bg-[url(../assets/background.jpg)] bg-cover backdrop-blur-[10px]`}
      >
        <div
          className="
        flex flex-col justify-center items-center 
        rounded-lg p-12 
        bg-black bg-opacity-40  backdrop-filter backdrop-blur-[10px] transition hover:backdrop-blur-[12px]
        shadow-[0_35px_60px_-15px_rgba(75,0,130)]"
        >
          <img src={logo} alt="logo" className="" />
          <Button
            variant="outlined"
            className="mt-3 border-[#4b0082] border-2 text-white transition hover:bg-[#4b0082]"
            onClick={() => {
              navigate("/login");
            }}
          >
            Create Game
          </Button>
          <Button
            className="mt-3"
            onClick={() => {
              setGameCreator(false);
              navigate("/game");
            }}
          >
            Join Game
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
