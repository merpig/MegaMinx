import { useEffect, useState } from "react";
import "./Solver.css";
import solve from "./solve";
import utils from "./utils";
import SpeedSlider from "../SpeedSlider/SpeedSlider";

const Solver = ({getCounter,setMoveQueue,setMenuId,setCurrentFunction,decaObject,speed,setSpeed}) => {

    const [moves,setMoves] = useState([]);
    const [loadMessage,setLoadMessage] = useState("Loading ...");
    const [currentMove,setCurrentMove] = useState(0);

    useEffect(()=>{
        console.log("yo");
        let solveMoves = [].concat(solve(decaObject));
        setCurrentMove(0);
        for(let i = 0;i<solveMoves.length;i++){
            if(solveMoves.length-3){
                if(solveMoves[i]===solveMoves[i+1]&&solveMoves[i]===solveMoves[i+2]&&solveMoves[i]===solveMoves[i+3]){
                    let reversed = utils.reverseMove(solveMoves[i])
                    solveMoves.splice(i,4,reversed);
                }
            }
            if(i<solveMoves.length-2){
                if(solveMoves[i]===solveMoves[i+1]&&solveMoves[i]===solveMoves[i+2]){
                    let reversed = utils.reverseMove(solveMoves[i]);
                    solveMoves.splice(i,3,reversed,reversed);
                }
            }
            if(i<solveMoves.length-1){
                let base = move => move.replace("'","");
                if(solveMoves[i]!==solveMoves[i+1]&&base(solveMoves[i])===base(solveMoves[i+1])){
                    solveMoves.splice(i,2);
                }
            }
        }
        console.log(solveMoves)
        setMoves(solveMoves);
        setLoadMessage("Already solved")
    },[]);

    let jumpToMove = value => {
        if(currentMove<value) {
            let movesToJump = moves.slice(currentMove,value);
            utils.updateDeca(movesToJump,decaObject);
            console.log(movesToJump);
            setCurrentMove(value);
        }
        else {
            let movesToJump = moves.slice(value,currentMove);
            movesToJump.reverse();
            movesToJump = movesToJump.map(move=>utils.reverseMove(move));
            utils.updateDeca(movesToJump,decaObject);
            console.log(movesToJump);
            setCurrentMove(value);
        }
    }
    
    let playOne = () =>{
        if(getCounter()) return;
        if(currentMove<moves.length){
            setMoveQueue([moves[currentMove]]);
            setCurrentMove(currentMove+1);
        }
    }

    let backOne = () =>{
        if(getCounter()) return;
        if(currentMove>0){
            setMoveQueue([utils.reverseMove(moves[currentMove-1])]);
            setCurrentMove(currentMove-1);
        }
    }

    let exitSolver = () => {
        setMenuId(0);
        setCurrentFunction('none');
    }

    return (
        <div className="solver-container">
            <SpeedSlider 
                speed={speed}
                setSpeed={setSpeed} 
            />
            <div className="solver-panel moves-container">
                {
                    moves.length?
                        moves.map((move,i)=>i===currentMove?
                            <div key={i} className="moves current-move">{move}</div>:
                            <div key={i} className="moves" onClick={()=>jumpToMove(i)}>{move}</div>
                        ):
                        loadMessage
                }
            </div>
            <div className="solver-panel controls-container">
                <div className="controls-wrapper">
                    <div className="control-button" onClick={playOne}>
                        Next
                    </div>
                    <div className="control-button" onClick={backOne}>
                        Back
                    </div>
                </div>
                
                <div className="controls-wrapper">
                    <div className="control-button" onClick={()=>{}}>
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