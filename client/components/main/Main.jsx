import React from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const Main = () => {
  let BAC = 0;
  let kile = 0;
  const [counter, setCounter] = useState(0);

  //increase counter
  const shootEvent = () => {
    setCounter((count) => count + 1);
  };

  const kileEvent = (event) => {
    kile = event.target.value;
  };

  return (
    <>
      <div className="text-3xl font-bold underline">
        <span className="text-3xl font-bold">Broj shotova: {counter}</span>
        <input type="number" onChange={kileEvent} />
        <button className="" onClick={shootEvent}>
          Shootiraj
        </button>
      </div>
      <div className="text-3xl font-bold underline">Main</div>
      <Button variant="outlined" color="blue">Šotiraj</Button>
    </>
  );
};

export default Main;
