import React from 'react'
import { useState } from 'react';

const Main = () => {
    let r = 0.68;
    const g_alch = 10.428;

    const [counter, setCounter] = useState(0);
    const [kile, setKile] = useState(0);
    const [gender, setGender] = useState("");
    const [buttonAndBacStyle, setButtonAndBacStyle] = useState("hidden")
    const [formStyle, setFormStyle] = useState("block")
    const [BAC, setBAC] = useState(0)
    
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
        <div className='text-3xl font-bold underline bg-black-300'>
            <form onSubmit={submitEvent} className={`${formStyle}`}>
                <input className='bg-green-500' type="number" onChange={kileEvent}/>
                <select onChange={genderEvent}>
                    <option value="Muško">Muško</option>
                    <option value="Žensko">Žensko</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            
            <button className={`${buttonAndBacStyle}`} onClick={shootEvent}>Shootiraj</button>
            <span className={`${buttonAndBacStyle}`}>{BAC}</span>
        </div>
        </>
        
    );

}

export default Main