import "./Menu.css";
import Main from "../Main/Main";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useState } from "react";

const Menu = ({setMoveQueue,reset,setCurrentFunction,currentFunction,setColor,getColor}) => {

    const [menuId,setMenuId] = useState(0);

    let menus = [
        <Main 
            setMoveQueue={setMoveQueue}
            reset={reset}
            setMenuId={setMenuId}
            setCurrentFunction={setCurrentFunction}
            currentFunction={currentFunction}
        />,
        <ColorPicker 
            setMenuId={setMenuId}
            setCurrentFunction={setCurrentFunction}
            getColor={getColor}
            setColor={setColor}
        />,
        <div></div>,
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