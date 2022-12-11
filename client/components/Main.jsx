import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../assets/logo.svg";
import { Input } from "@material-tailwind/react";
import "./main.css";

import { FaWeightHanging } from "react-icons/fa";

const Main = () => {
  const g_alch = 10.428;

  const [brojPica, setBrojPica] = useState(1);
  const [kile, setKile] = useState(0);
  const [buttonAndBacStyle, setButtonAndBacStyle] = useState("hidden");
  const [formStyle, setFormStyle] = useState("block");
  const [BAC, setBAC] = useState(0);
  const [created, setCreated] = useState(false);
  const [r, setR] = useState(0);

  const kileEvent = (event) => {
    setKile(event.target.value * 1000);
  };

  const genderEvent = (event) => {
    console.log(event.target.value);
    //console.log(gender)
    if (event.target.value == "Žensko") {
      setR(0.55);
    } else if (event.target.value == "Muško") {
      setR(0.68);
    }
  };

  const submitEvent = (event) => {
    event.preventDefault();
    setButtonAndBacStyle("block");
    setFormStyle("hidden");
  };

  const shootEvent = () => {
    setBrojPica((count) => count + 1);
    setBAC(((brojPica * g_alch) / (kile * r)) * 1000);
  };
  return (
    <>
      {!created ? (
        <div
          className={`h-[100vh] w-[100vw] flex justify-center items-center flex-col`}
        >
          <img src={logo} alt="logo" className="" />
          <Button
            className="h-[40px]"
            onClick={() => {
              setCreated(true);
            }}
          >
            Create Game
          </Button>
        </div>
      ) : (
        <div id="container" className="h-[100vh] w-[100vw] flex justify-center">
          <div className="bg-black-300 w-[300px] flex flex-col justify-center">
            <form
              onSubmit={submitEvent}
              className={`${formStyle} flex flex-col items-center`}
            >
              <select
                onChange={genderEvent}
                className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
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
              <Button type="submit" className="mt-3 ml-auto mr-auto">
                Submit
              </Button>
            </form>
            <Button
              variant="outlined"
              color="blue"
              className={`${buttonAndBacStyle}`}
              onClick={shootEvent}
            >
              Šotiraj
            </Button>
            <span className={`${buttonAndBacStyle}`}>{BAC}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Main;
