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
        className={`h-[100vh] w-[100vw] flex justify-center items-center flex-col`}
      >
        <img src={logo} alt="logo" className="" />
        <Button
          className={`h-[40px]`}
          onClick={() => {
            navigate("/login");
          }}
        >
          Kreiraj Novu Igru
        </Button>
        <Button
          className={`h-[40px]`}
          onClick={() => {
            navigate("/join");
          }}
        >
          Pridruži se Postojećoj Igri
        </Button>
      </div>
    </>
  );
};

export default HomePage;
