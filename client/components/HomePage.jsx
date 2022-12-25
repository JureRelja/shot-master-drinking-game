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
      <div
        className={`
        h-[100vh] w-[100vw] grid place-items-center
        bg-[url(../assets/club_background.png)] bg-center bg-cover backdrop-blur-[10px]`}
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-[10vw] h-[50vh] w-[50vw] ">
          {/* <div></div> */}
          <div
            className="
            flex flex-col items-center justify-center rounded-lg 
            bg-[#2f2c7a] bg-opacity-40 backdrop-filter backdrop-blur-lg 
            transition-all duration-[900ms] ease-in-out 
            hover:backdrop-blur-[12px] hover:bg-opacity-20 hover:bg-[#d61448]
            shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]
        "
          >
            <img src={logo} alt="logo" className="w-[50%]" />
            <Button
              variant="outlined"
              className="border-[#ffc107] mt-3 border-2 transition-all duration-[400ms]  hover:opacity-100 hover:bg-[#ffc107] bg-opacity-90
              text-white"
              onClick={() => {
                navigate("/login");
              }}
            >
              Create Game
            </Button>
            <Button
              color="amber"
              className="mt-3  text-white transition-all duration-[400ms]"
              onClick={() => {
                setGameCreator(false);
                navigate("/game");
              }}
            >
              Join Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
