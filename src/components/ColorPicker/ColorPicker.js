import { useEffect, useState } from "react";
import revisedSolver from "../Solver/revisedSolver"
import "./ColorPicker.css";

const ColorPicker = ({getCpVars,getDeca,setMenuId,setCurrentFunction,resetMegaMinx,colorNames,faceColors,hexToColor}) => {
    // array of face colors in the order they're generated
    const [selected,setSelected] = useState(0);
    const [status,setStatus] = useState("Solve");

    function onMouseDown(e) {
        let {mouse,camera,raycaster,scene} = getCpVars();
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        // Set the raycaster to check for intersected objects
        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObjects( scene.children );

        // Filter only pieces that should be interacted with
        let filteredIntersects = intersects.filter(
            e=>e.object.name==="corner"||e.object.name==="edge"
        );

        if(filteredIntersects[0]){
            filteredIntersects[0].object.material.color.set(faceColors[selected]);
            let check = revisedSolver(getDeca(),colorNames,hexToColor)[0];
            check==="error"?setStatus("Invalid"):setStatus("Solve")
        }
    }

    useEffect(()=>{
        window.addEventListener("pointerdown",onMouseDown,false);

        return function cleanup () {
            window.removeEventListener("pointerdown",onMouseDown,false)
        }
    },[selected]);

    let switchToSolver = currentStatus => {
        if(currentStatus==="Solve"){
            setMenuId(2);
            setCurrentFunction("solver")
        }
    }


    return (
        <div className="color-menu-container">
            <div className="cp-info-panel">
                <div className="total-moves">
                    <div>Current Color:</div>
                    <div 
                        className={`cp-info-data ${colorNames[selected]}`}
                        style={{backgroundColor:`${faceColors[selected]}`}}
                    ></div>
                </div>
            </div>
            <div className="color-menu">
                {colorNames.map((color,i)=>
                    <div 
                        className={`color-button ${color.replace(' ','-')}`} 
                        key={color}
                        style={{backgroundColor:`${faceColors[i]}`}}
                        onClick={
                            ()=>{
                                setSelected(i);
                            }
                        }
                    >
                        <div className="holder-text">Color buttons</div>
                        {i===selected?
                            <div className="blackdot"></div>:<></>
                        }
                    </div>
                )}
            </div>
            <div className="color-options">
                <div className="option-button color-exit" onClick=
                    {()=>{
                        setMenuId(0);
                        setCurrentFunction('none');
                        resetMegaMinx();
                    }}
                >
                    <strong>Exit</strong>
                </div>
                <div className={`option-button color-check ${status}`} onClick={()=>switchToSolver(status)}>
                    <strong>{status}{status==="Solve"?"r!":""}</strong>
                </div>
            </div>
            
        </div>
        
    )

}

export default ColorPicker;