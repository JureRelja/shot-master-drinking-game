import React from "react";
import { useState } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import "./main.css";
import { LoginPage } from "./";

import Rive from "@rive-app/react-canvas";
import Cheers from "../assets/cheers.riv";

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
        <div className="fixed grid grid-cols-1 grid-rows-5 gap-2 w-[30px] bg-[#F69156] h-screen top-0 left-0 drop-shadow-lg">
          <div className="bg-[#FD7221]">
            <Tooltip
              placement="right"
              className="w-[80vw] max-w-[400px] bg-white text-black p-5 ml-2"
              content="The aim of the game is to prove your friends that you know how to drink the best and earn most points in the process. You earn point by trying to get your player as close to the BAC (Blood alcohol concentration) level displayed on the screen. The number of earned points also depends on how many drinks you finish in the process of trying to get your player 'drunk', but you will earn the most points if you just focus on getting your player as close as posible to the displayed BAC level. The game lasts 3 rounds. Each round lasts 60 seconds, and as the time pases your player get sober, like in real life. Note that 60 seconds of time in the game present 5 hours of real life. Earned points add up after each round, and who ever has the most points at the end is the overall winner. You are free to drink using any tactic you know (fast, slow, superfast, responsible, etc.). Also note that one drink presents a standard shoot of 33 mL of 40% alcohol. Try it out for yourself by creating a game and passing your 'RoomID' to your friend to join."
            >
              <Button
                className="m-0 p-0 grid place-items-center
                    h-full w-full rotate-180
                    text-white font-medium
                    rounded-none
                    bg-opacity-0 shadow-none sm:shadow-none hover:shadow-none
                    transition-all hover:bg-[#ee6a1e] hover:animate-[wiggle_1s_ease-in-out_infinite]
                "
              >
                <p id="orientation" className="normal-case">
                  How to play?
                </p>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Rive src={Cheers} className="h-[50vh] w-[70vw]" />{" "}
          <div
            className={`
            -mt-12 h-[170px] min-w-[300px] w-[25vw] flex flex-col justify-center items-center
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
                setGameCreator(true);
              }}
            >
              Create game
            </button>
            <button
              className={`mt-3 bg-white py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] hover:bg-[#fd853f] hover:text-white`}
              onClick={() => {
                setDarken_bg("");
                setShowForm(true);
                setGameCreator(false);
              }}
            >
              Join existing game
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
