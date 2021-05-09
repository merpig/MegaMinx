import "./Main.css";
import MenuButton from "../MenuButton/MenuButton";
import scramble from "./scramble";
import SpeedSlider from "../SpeedSlider/SpeedSlider";
import { useState } from "react";
const Main = ({setMoveQueue,reset,setMenuId,setCurrentFunction,currentFunction,speed,setSpeed}) => {

    let [sliderSpeed,setSliderSpeed] = useState(3);

    return (

        <div className="main-menu">

            <SpeedSlider 
                speed={speed}
                sliderSpeed={sliderSpeed}
                setSpeed={setSpeed} 
                setSliderSpeed={setSliderSpeed}
            />

            <div className="panel panel-left">

                <MenuButton setCurrentFunction={setCurrentFunction} onClick={()=>{
                    if(currentFunction()!=="none") return;
                    setMenuId(1);
                    setCurrentFunction("colorpicker")
                }}>Color Picker</MenuButton>

                <MenuButton onClick={()=>setMenuId(0/*2*/)}>Solver</MenuButton>

                <MenuButton onClick={()=>setMenuId(0/*3*/)}>Patterns</MenuButton>

            </div>

            <div className="panel-divider"></div>

            <div className="panel panel-right">

                <MenuButton></MenuButton>

                <MenuButton onClick={()=>{
                    setMoveQueue(scramble());
                    setCurrentFunction("scramble");
                }}>Scramble</MenuButton>

                <MenuButton onClick={()=>reset(Date.now())}>Reset</MenuButton>

            </div>

        </div>

    )
}

export default Main;