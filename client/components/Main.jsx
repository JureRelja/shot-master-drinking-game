import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../assets/logo.svg";

const Main = () => {
  const g_alch = 10.428;

  const [brojPica, setBrojPica] = useState(1);
  const [kile, setKile] = useState(0);
  const [buttonAndBacStyle, setButtonAndBacStyle] = useState("hidden");
  const [formStyle, setFormStyle] = useState("block");
  const [BAC, setBAC] = useState(0);
  const [created, setCreated] = useState(false);
  const [r, setR] = useState(0);
  const [secondsPassed, setSecondsPassed] = useState(0)

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

  useEffect(() => {
    
    let timer = setTimeout(() => {
      setSecondsPassed(secondsPassed + 1)
    }, 1000)
    
    return () => {
       clearTimeout(timer)
    }
  }, [BAC])
  

  const shootEvent = () => {
    setBrojPica((count) => count + 1);
    setBAC(((brojPica * g_alch) / (kile * r)) * 1000);
  };
  return (
    <>
      {!created ? (
        <div
          className={`h-[100vh] w-[100%] flex justify-center items-center flex-col`}
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
        <div id="container" className="flex justify-center">
          <div className="bg-black-300 w-[300px]">
            <form onSubmit={submitEvent} className={`${formStyle}`}>
              <input
                className="bg-green-500"
                type="number"
                onChange={kileEvent}
              />
              <select onChange={genderEvent}>
                <option value="" selected disabled hidden></option>
                <option value="Muško">Muško</option>
                <option value="Žensko">Žensko</option>
              </select>
              <button type="submit">Submit</button>
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
