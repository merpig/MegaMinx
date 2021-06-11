import "./Main.css";
import MenuButton from "../MenuButton/MenuButton";
import scramble from "./scramble";
import SpeedSlider from "../SpeedSlider/SpeedSlider";
import UndoRedo from "../UndoRedo/UndoRedo";
import { useState } from "react";
const Main = ({setMoveLogIndex,setMoveQueue,reset,setMenuId,setCurrentFunction,currentFunction,speed,setSpeed}) => {

    let [sliderSpeed,setSliderSpeed] = useState(5);

    return (

        <div className="main-menu">

            <SpeedSlider 
                speed={speed}
                sliderSpeed={sliderSpeed}
                setSpeed={setSpeed} 
                setSliderSpeed={setSliderSpeed}
            />

            <UndoRedo setIndex={setMoveLogIndex}/>

            <div className="panel panel-left">
                <MenuButton></MenuButton>
                <MenuButton setCurrentFunction={setCurrentFunction} onClick={()=>{
                    if(currentFunction()!=="none") return;
                    setMenuId(1);
                    setCurrentFunction("colorpicker")
                }}>Color Picker</MenuButton>

                <MenuButton onClick={()=>{
                    if(currentFunction()!=="none") return;
                    setMenuId(2);
                    setCurrentFunction("solver")
                }}>Solver</MenuButton>

                {/* <MenuButton onClick={()=>setMenuId(0)}>
                    Patterns
                </MenuButton> */}

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