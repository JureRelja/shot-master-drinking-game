import React from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { CreateGameScreen } from "..";

const Main = () => {
    let r = 0.68;
    const g_alch = 10.428;

    const [counter, setCounter] = useState(0);
    const [kile, setKile] = useState(0);
    const [gender, setGender] = useState("");
    const [buttonAndBacStyle, setButtonAndBacStyle] = useState("hidden")
    const [formStyle, setFormStyle] = useState("block")
    const [BAC, setBAC] = useState(0)

    const [created, setCreated] = useState(false)

    
    const kileEvent = event => {
       setKile(event.target.value * 1000)
    }

    const genderEvent = event => {
        setGender(event.target.value)
        if (gender == "Muško") {
            r = 0.68
        }
    }
    
    const submitEvent = event => {
        event.preventDefault()
        setButtonAndBacStyle("block") 
        setFormStyle("hidden") 
    }

    const shootEvent = () => {
        setCounter(count => count + 1);
        setBAC((counter*g_alch/(kile*r))*1000)
    };
    return (
        <>
        {!created ? <CreateGameScreen />
        : (
          <div id="container" className="flex justify-center">
              <div className='bg-black-300 w-[300px]'>
                  <form onSubmit={submitEvent} className={`${formStyle}`}>
                      <input className='bg-green-500' type="number" onChange={kileEvent}/>
                      <select onChange={genderEvent}>
                          <option value="Muško">Muško</option>
                          <option value="Žensko">Žensko</option>
                      </select>
                      <button type="submit">Submit</button>
                  </form>
                  <h1>Utapanje</h1>
                  <Button variant="outlined" color="blue" className={`${buttonAndBacStyle}`} onClick={shootEvent}>Šotiraj</Button>
                  <span className={`${buttonAndBacStyle}`}>{BAC}</span>
              </div>
          </div>
        )}  
        </>
        
    );
}
export default Main;
