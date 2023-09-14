import "./Menu.css";
import Main from "../Main/Main";
import ColorPicker from "../ColorPicker/ColorPicker";
import Solver from "../Solver/Solver"
import { useState } from "react";

const Menu = ({setTurn,getTurn,rightHints,leftHints,getDeca,getCpVars,getCounter,setMoveLogIndex,setMoveQueue,resetMegaMinx,reset,setCurrentFunction,currentFunction,speed,setSpeed,decaObject,hexToColor,colorNames,faceColors,setFaceColors}) => {

    const [menuId,setMenuId] = useState(0);
    
    let menus = [
        <Main 
            setMoveQueue={setMoveQueue}
            reset={reset}
            setMenuId={setMenuId}
            setCurrentFunction={setCurrentFunction}
            currentFunction={currentFunction}
            speed={speed}
            setSpeed={setSpeed}
            setMoveLogIndex={setMoveLogIndex}
            faceColors={faceColors}
            setFaceColors={setFaceColors}
        />,
        <ColorPicker 
            setMenuId={setMenuId}
            setCurrentFunction={setCurrentFunction}
            resetMegaMinx={resetMegaMinx}
            getDeca={getDeca}
            getCpVars={getCpVars}
            colorNames={colorNames}
            faceColors={faceColors}
            hexToColor={hexToColor}
        />,
        <Solver
            setMenuId={setMenuId}
            setMoveQueue={setMoveQueue}
            setCurrentFunction={setCurrentFunction}
            decaObject={decaObject}
            getDeca={getDeca}
            speed={speed}
            setSpeed={setSpeed}
            getCounter={getCounter}
            rightHints={rightHints}
            leftHints={leftHints}
            setTurn={setTurn}
            getTurn={getTurn}
            colorNames={colorNames}
            faceColors={faceColors}
            hexToColor={hexToColor}
        />,
        <div></div>
    ]

    return (
        <div className="menu-box-container">
            <div className="menu-box">
                {menus[menuId]}
            </div>
        </div>
    );

}

export default Menu;