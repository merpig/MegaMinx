import { useEffect, useState } from "react";
import "./Solver.css";
import utils from "./utils";
import SpeedSlider from "../SpeedSlider/SpeedSlider";
import revisedSolver from "./revisedSolver"

const Solver = ({getTurn,setTurn,rightHints,leftHints,getCounter,setMoveQueue,setMenuId,setCurrentFunction,decaObject,getDeca,speed,setSpeed}) => {

    const [moves,setMoves] = useState([]);
    const [loadMessage,setLoadMessage] = useState("Loading ...");
    const [currentMove,setCurrentMove] = useState(0);
    const [autoMode,setAutoMode] = useState("");
    const [blocker,setBlocker] = useState(false);

    let mouseDown = false;

    function onSolverMouseDown(e){
        mouseDown=true;
    }

    function onSolverMouseUp(e){
        mouseDown=false;
    }

    function onSolverMouseMove(e) {
        if(!mouseDown) return;
        let move = currentMove;
        let moveSet = moves;
        console.log(getTurn(),move);
        if(getTurn()===moveSet[move]) {
            playOne();
            setTurn();
        }
    }
    
    useEffect(()=>{
        window.addEventListener("pointerdown",onSolverMouseDown,false);
        window.addEventListener("pointerup",onSolverMouseUp,false);
        window.addEventListener("pointermove",onSolverMouseMove,false);
        
        return () => {
            window.removeEventListener("pointerdown",onSolverMouseDown,false)
            window.removeEventListener("pointerup",onSolverMouseUp,false)
            window.removeEventListener("pointermove",onSolverMouseMove,false);
        }
    })
    
    useEffect(()=>{
        let solveMoves = revisedSolver(getDeca());
        
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

        if(solveMoves.length){
            for(const key in leftHints){
                leftHints[`${key}`].forEach(arrow=>arrow.visible=false)
            }
            for(const key in rightHints){
                rightHints[`${key}`].forEach(arrow=>arrow.visible=false)
            }
            if(solveMoves[currentMove])
            

            solveMoves[currentMove].includes("'")?
                leftHints[`${solveMoves[currentMove]}`].forEach(arrow=>arrow.visible=true):
                rightHints[`${solveMoves[currentMove]}`].forEach(arrow=>arrow.visible=true)
        }

        setMoves(solveMoves);
        setLoadMessage("Already solved")

    },[]);

    useEffect(()=>{
        if(moves.length){
            for(const key in leftHints){
                leftHints[`${key}`].forEach(arrow=>arrow.visible=false)
            }
            for(const key in rightHints){
                rightHints[`${key}`].forEach(arrow=>arrow.visible=false)
            }
            if(moves[currentMove]&&autoMode===""&&!blocker)
            moves[currentMove].includes("'")?
                leftHints[`${moves[currentMove]}`].forEach(arrow=>arrow.visible=true):
                rightHints[`${moves[currentMove]}`].forEach(arrow=>arrow.visible=true)
        }
        if(autoMode!=="") {
            setMoveQueue([],false,setCurrentMove,currentMove,"",setAutoMode);
        }
    },[currentMove,autoMode]);

    let jumpToMove = value => {
        setBlocker(false)
        if(currentMove<value) {
            let movesToJump = moves.slice(currentMove,value);
            utils.updateDeca(movesToJump,decaObject);
            setCurrentMove(value);
        }
        else {
            let movesToJump = moves.slice(value,currentMove);
            movesToJump.reverse();
            movesToJump = movesToJump.map(move=>utils.reverseMove(move));
            utils.updateDeca(movesToJump,decaObject);
            setCurrentMove(value);
        }
    }
    
    let playOne = () =>{
        if(autoMode!=="") return;
        if(getCounter()) return;
        setBlocker(true)
        setAutoMode("");
        if(currentMove<moves.length){
            setMoveQueue([moves[currentMove]],false,undefined,moves[currentMove+1],);
            setCurrentMove(currentMove+1);
        }
    }

    let backOne = () =>{
        if(autoMode!=="") return;
        if(getCounter()) return;
        setBlocker(true)
        setAutoMode("");
        if(currentMove>0){
            setMoveQueue([utils.reverseMove(moves[currentMove-1])],false,undefined,moves[currentMove-1],);
            setCurrentMove(currentMove-1);
        }
    }

    let playAll = () => {
        if(autoMode!=="") return;
        if(moves.length<=currentMove) return;
        if(getCounter()) return;
        setBlocker(false)
        setAutoMode("autoPlay");
        setMoveQueue(moves.slice(currentMove),false,setCurrentMove,currentMove,"play");
    }

    let backAll = () => {
        if(autoMode!=="") return;
        if(currentMove<=0) return;
        if(getCounter()) return;
        let tempMoves = moves.slice(0,currentMove).reverse().map(move=>utils.reverseMove(move))
        setBlocker(false)
        setAutoMode("autoBack");
        setMoveQueue(tempMoves,false,setCurrentMove,currentMove,"back");
    }

    let pause = () =>{
        setAutoMode("")
        setMoveQueue([],true,undefined,undefined,undefined);
    }

    let exitSolver = () => {
        for(const key in leftHints){
            leftHints[`${key}`].forEach(arrow=>arrow.visible=false)
        }
        for(const key in rightHints){
            rightHints[`${key}`].forEach(arrow=>arrow.visible=false)
        }
        setMenuId(0);
        setCurrentFunction('none');
    }

    let moveToColor = move => utils.faceColors[parseInt(move.replace("'",""))-1]

    return (
        <div className="solver-container">
            <SpeedSlider 
                speed={speed}
                setSpeed={setSpeed} 
            />
            <div className="solver-info-panel">
                <div className="total-moves">
                    <div>Total Moves:</div>
                    <div className="solver-info-data">
                        <div className="info-content">
                            {moves.length?moves.length:"None"}
                        </div>
                    </div>
                </div>
                <div className="current-moves">
                    <div>Next Move: </div>
                    <div className="solver-info-data">
                        <div className="info-content">
                            {moves.length>currentMove?currentMove+1:"None"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="solver-panel moves-container">
                {
                    moves.length?
                        moves.map((move,i)=>i===currentMove?
                            <div key={i} className="moves current-move" style={{color: `${moveToColor(move)}`}}>
                                {move}
                            </div>:
                            <div key={i} className="moves" onClick={()=>jumpToMove(i)} style={{color: `${moveToColor(move)}`}}>
                                {move}
                            </div>
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
                    {
                        autoMode==="autoPlay"?
                        <div className="control-button" onClick={pause}>
                            Pause
                        </div>:
                        <div className="control-button" onClick={playAll}>
                            Auto play
                        </div>
                    }
                    {
                        autoMode==="autoBack"?
                        <div className="control-button" onClick={pause}>
                            Pause
                        </div>:
                        <div className="control-button" onClick={backAll}>
                            Auto Back
                        </div>
                    }
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