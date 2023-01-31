import React from "react";
import { useState } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import "./main.css";
import { FaWeightHanging } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "./";

import Rive from "@rive-app/react-canvas";
import Cheers from "../assets/cheers.riv";
import Test from "../assets/new_file.riv";

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
              content="Cilj igre je pokazati da se najbolje razumiješ u ispijanje alkoholnih pića i pri tome zaraditi najviše bodova. Bodove zarađuješ tako što pokušavaš svog igrača dovesti što bliže levelu alkohola u krvi prikazanom na tvom ekranu. Broj zarađenih bodova ovisi i o broju pića koja popiješ dok pokušavaš 'napiti' svog igrača, ali najviše bodova ćeš zaraditi ako se samo fokusiraš na pogađanje točnog levela alkohola u krvi. Igra traje tri runde. Bodovi nakon svake runde se zbrajaju i tko na kraju ima najviše bodova je pobjednik.... Možeš ispijati pića na koji god način želiš (brzo, sporo, superbrzo, umjereno, itd.). Znaj da jedno piće simulira standardnu mjeru od 33 mL alkoholnog pića koje sadrži 40% alkohola.... Stoga kreiraj igru, pošalji svoj 'RoomID' svom suigraču i pokaži da poznaješ alkohol bolje od njega."
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
                  Kako igrati?
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
              Kreiraj igru
            </button>
            <button
              className={`mt-3 bg-white py-2 px-5 border-black border-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all hover:shadow-[1px_0px_0px_0px_rgba(0,0,0)] hover:bg-[#fd853f] hover:text-white`}
              onClick={() => {
                setDarken_bg("");
                setShowForm(true);
                setGameCreator(false);
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
