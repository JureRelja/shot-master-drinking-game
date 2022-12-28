import React from "react";
import { Fragment, useEffect, useState } from "react";
import {
  Tooltip,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import "./main.css";
import { LoginPage } from "./";

const HomePage = ({ socket }) => {
  const [darken_bg, setDarken_bg] = useState("hidden");
  const [showForm, setShowForm] = useState(false);
  const [gameCreator, setGameCreator] = useState(false);

  return (
    <>
      <div
        id="main"
        className={`
        h-screen w-screen grid place-items-center
        bg-[url('../assets/bg-image.png')] bg-center bg-cover`}
      >
        <div
          className={`absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm ${darken_bg}`}
        ></div>
        <div className="fixed grid grid-cols-1 grid-rows-5 gap-2 w-[30px] bg-[#F69156] h-screen top-0 left-0">
          <div className="bg-[#FD7221]">
            <Tooltip
              placement="right"
              className="w-[70vw] max-w-[400px] bg-white text-black p-5 ml-2"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium magnam amet voluptatibus quisquam repudiandae, corrupti quas ipsa! Labore laboriosam quidem quae minus enim aliquid vel earum aperiam obcaecati corporis! Eveniet."
            >
              <Button
                id="orientation"
                className="m-0 p-0
                    h-full w-full 
                    text-white normal-case font-medium
                    rounded-none
                    bg-opacity-0 shadow-none sm:shadow-none hover:shadow-none
                    transition-all hover:bg-[#ee6a1e] hover:animate-[wiggle_1s_ease-in-out_infinite]
                "
              >
                Kako igrati
              </Button>
            </Tooltip>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/players.png" alt="" className="h-[90%] w-[90%]" />
          <div
            className={`
            -mt-12 h-[170px] w-[25vw] flex flex-col justify-center items-center
            transition-all duration-[900ms] ease-in-out 
            bg-[#FECB63] 
            shadow-[0px_5px_10px_0px_rgba(0,0,0)]
            
          `}
          >
            <button
              className={`py-2 px-5 border-black border-2 shadow-[5px_4px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] bg-[#FD7221] text-white`}
              onClick={() => {
                setDarken_bg("");
                setGameCreator(true);
                setShowForm(true);
              }}
            >
              Kreiraj igru
            </button>
            <button
              className={`mt-3 bg-white py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] hover:bg-[#fd853f] hover:text-white`}
              onClick={() => {
                setDarken_bg("");
                setGameCreator(false);
                setShowForm(true);
              }}
            >
              Pridruzi se postojecoj igri
            </button>
          </div>
          {showForm && (
            <LoginPage
              setDarken_bg={setDarken_bg}
              gameCreator={gameCreator}
              setShowForm={setShowForm}
              socket={socket}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
