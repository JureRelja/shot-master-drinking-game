import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

const Main = () => {
    const g_alch = 10.428;

    const [brojPica, setBrojPica] = useState(1);
    const [kile, setKile] = useState(0);
    const [buttonAndBacStyle, setButtonAndBacStyle] = useState("hidden")
    const [formStyle, setFormStyle] = useState("block")
    const [BAC, setBAC] = useState(0)
    const [r, setR] = useState(0)
    
    const kileEvent = event => {
       setKile(event.target.value * 1000)
    }

    const genderEvent = event => {
        console.log(event.target.value)
        //console.log(gender)
        if (event.target.value == "Žensko") {
            setR(0.55)
        }
        else if (event.target.value == "Muško") {
            setR(0.68)
        }
    }
    
    const submitEvent = event => {
        event.preventDefault()
        setButtonAndBacStyle("block") 
        setFormStyle("hidden") 
    }

    const shootEvent = () => {
        setBrojPica(count => count + 1);
        setBAC((brojPica*g_alch/(kile*r))*1000)
    };
    return (
        <>
        <div className='text-3xl font-bold underline bg-black-300'>
            <form onSubmit={submitEvent} className={`${formStyle}`}>
                <input className='bg-green-500' type="number" onChange={kileEvent}/>
                <select onChange={genderEvent}>
                    <option value="" selected disabled hidden>Odaberi spol</option>
                    <option value="Muško">Muško</option>
                    <option value="Žensko">Žensko</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            
            <Button variant="outlined" color="green" className={`${buttonAndBacStyle}`} onClick={shootEvent}>Šotiraj</Button>
            <span className={`${buttonAndBacStyle}`}>{BAC}</span>
        </div>
        </>
        
    );
}
export default Main;
