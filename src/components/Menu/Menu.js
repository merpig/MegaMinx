import "./Menu.css";
import Main from "../Main/Main";
import ColorPicker from "../ColorPicker/ColorPicker";
import Solver from "../Solver/Solver"
import { useState } from "react";

const Menu = ({currentMove,setCurrentMove,getCounter,setMoveLogIndex,setMoveQueue,resetMegaMinx,reset,setCurrentFunction,currentFunction,setColor,getColor,speed,setSpeed,decaObject}) => {

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
            getColor={getColor}
            setColor={setColor}
            resetMegaMinx={resetMegaMinx}
        />,
        <Solver
            setMenuId={setMenuId}
            setMoveQueue={setMoveQueue}
            setCurrentFunction={setCurrentFunction}
            decaObject={decaObject}
            speed={speed}
            setSpeed={setSpeed}
            getCounter={getCounter}
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