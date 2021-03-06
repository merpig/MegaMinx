import "./Menu.css";
import Main from "../Main/Main";
import ColorPicker from "../ColorPicker/ColorPicker";
import Solver from "../Solver/Solver"
import { useState } from "react";

const Menu = ({setTurn,getTurn,rightHints,leftHints,getDeca,getCpVars,getCounter,setMoveLogIndex,setMoveQueue,resetMegaMinx,reset,setCurrentFunction,currentFunction,speed,setSpeed,decaObject}) => {

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
        />,
        <ColorPicker 
            setMenuId={setMenuId}
            setCurrentFunction={setCurrentFunction}
            resetMegaMinx={resetMegaMinx}
            getDeca={getDeca}
            getCpVars={getCpVars}
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