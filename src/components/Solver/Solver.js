import { useEffect, useState } from "react";
import "./Solver.css";
import solve from "./solve";

const Solver = ({setMenuId,setCurrentFunction,decaObject}) => {

    const [moves,setMoves] = useState([]);
    const [loadMessage,setLoadMessage] = useState("Loading ...")
    useEffect(()=>{
        let solveMoves = solve(decaObject);
        setMoves(solveMoves);
        setLoadMessage("Already solved")
    },[])
    
    let exitSolver = () => {
        setMenuId(0);
        setCurrentFunction('none');
    }

    return (
        <div className="solver-container">
            <div className="solver-panel moves-container">
                {
                    moves.length?
                        moves.map((move,i)=>
                            <div key={i} className="moves">{move}</div>
                        ):
                        loadMessage
                }
            </div>
            <div className="solver-panel controls-container">
                <div className="controls-wrapper">
                    <div className="control-button">
                        Next
                    </div>
                    <div className="control-button">
                        Back
                    </div>
                </div>
                
                <div className="controls-wrapper">
                    <div className="control-button">
                        Auto play
                    </div>
                    <div className="control-button">
                        Auto back
                    </div>
                </div>

                <div className="controls-wrapper">
                    <div className="control-button exit-button" onClick={exitSolver}>
                        Exit
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Solver;