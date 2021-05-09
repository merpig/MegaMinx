import "./Main.css";
import MenuButton from "../MenuButton/MenuButton";
import scramble from "./scramble";
const Main = ({setMoveQueue,reset,setMenuId,setCurrentFunction,currentFunction}) => {
    return (
        <div className="main-menu">
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