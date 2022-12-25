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
        bg-[url('../assets/bg1.jpg')] bg-center bg-cover backdrop-blur-[10px]`}
      >
        {/* <img
          src="../assets/test1.jpg"
          alt=""
          className="mix-blend-overlay absolute"
        /> */}
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-[10vw] h-[50vh] w-[50vw] ">
          {/* <div></div> */}
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
