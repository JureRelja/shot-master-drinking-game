import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../assets/logo.svg";

const Main = () => {
  const g_alch = 10.428;

  const [buttonAndBacStyle, setButtonAndBacStyle] = useState("hidden");
  const [formStyle, setFormStyle] = useState("block");
  const [pokreniIgruBtnStyle, setPokreniIgruBtnStyle] = useState("hiden");

  const [kile, setKile] = useState(0);
  const [ukupniBAC, setUkupniBAC] = useState(0);
  const [trenutniBAC, setTrenutniBAC] = useState(0);
  const [created, setCreated] = useState(false);
  const [r, setR] = useState(0);
  const [secondsPassed, setSecondsPassed] = useState(0);

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
    if (r == 0 || kile == 0) {
      alert("Niste unijeli masu ili odabrali spol");
    } else {
      setFormStyle("hidden");
      setPokreniIgruBtnStyle("block");
    }
  };
  useEffect(() => {
    console.log(secondsPassed);
    let timer = setTimeout(() => {
      setSecondsPassed(secondsPassed + 1);
      setUkupniBAC(ukupniBAC - secondsPassed * (1 / 12) * 0.15 + trenutniBAC);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pokreniIgruBtnStyle]);

  const startGameEvent = () => {
    setPokreniIgruBtnStyle("hidden");
    setButtonAndBacStyle("block");
  };

  const shootEvent = () => {
    setTrenutniBAC(
      (g_alch / (kile * r)) * 1000 - brojSekundi * (1 / 12) * 0.15
    );
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
                <option value="" selected disabled hidden>
                  Odaberi spol
                </option>
                <option value="Muško">Muško</option>
                <option value="Žensko">Žensko</option>
              </select>
              <button type="submit">Submit</button>
            </form>

            <Button
              variant="outlined"
              color="blue"
              className={`${pokreniIgruBtnStyle}`}
              onClick={startGameEvent}
            >
              Pokreni igru
            </Button>

            <Button
              variant="outlined"
              color="green"
              className={`${buttonAndBacStyle}`}
              onClick={shootEvent}
            >
              Šotiraj
            </Button>
            <span className={`${buttonAndBacStyle}`}>{ukupniBAC}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Main;
