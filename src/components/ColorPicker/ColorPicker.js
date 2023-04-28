import { useCallback, useContext, useEffect, useState } from "react";

import revisedSolver from "../Solver/revisedSolver"
import "./ColorPicker.css";
import { ColorsContext } from "../../contexts/colors";

const ColorPicker = ({getCpVars,getDeca,setMenuId,setCurrentFunction,resetMegaMinx}) => {
    // array of face colors in the order they're generated
    const [selected,setSelected] = useState(0);
    const [status,setStatus] = useState("Solve");
    const { colorsArray } = useContext(ColorsContext);

    const onMouseDown = useCallback((e) => {
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
            filteredIntersects[0].object.material.color.set(colorsArray[selected][1]);
            let check = revisedSolver(getDeca())[0];
            check==="error"?setStatus("Invalid"):setStatus("Solve")
        }
    },[colorsArray, getCpVars, getDeca, selected]);

    useEffect(()=>{
        window.addEventListener("pointerdown",onMouseDown,false);

        return function cleanup () {
            window.removeEventListener("pointerdown",onMouseDown,false)
        }
    },[onMouseDown, selected]);

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

                    <div style={{backgroundColor: colorsArray[selected][1]}} className={'cp-info-data'}></div>
                </div>
            </div>

            <div className="color-menu">
                {colorsArray.map((color,i) =>
                    <div 
                        style={{backgroundColor: color[1]}}
                        className={'color-button'} 
                        key={color} 
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