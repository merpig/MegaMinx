import { useEffect, useState } from "react";
import revisedSolver from "../Solver/revisedSolver"
import "./ColorPicker.css";

const ColorPicker = ({getCpVars,getDeca,setMenuId,setCurrentFunction,resetMegaMinx}) => {
    // array of face colors in the order they're generated
    const [selected,setSelected] = useState(0);
    const [status,setStatus] = useState("Solve");

    let faceColors = [
        "blue",     // 1
        "pink",     // 2
        "yellow",   // 3
        "red",      // 4
        "green",    // 5
        "light purple",  // 6 light purple

        "light blue",  // 7 light blue
        "light brown",  // 8 light brown
        "light green",  // 9 light green
        "orange",   // 10
        "purple",   // 11
        "white"     // 12
    ];

    let faceColorsValues = [
        "blue",     // 1
        "#ff80ce",     // 2 pink
        "yellow",   // 3
        "red",      // 4
        "green",    // 5
        "#c585f7",  // 6 light purple

        "#4fc3f7",  // 7 light blue
        "#C39B77",  // 8 light brown
        "#64dd17",  // 9 light green
        "orange",   // 10
        "purple",   // 11
        "white"     // 12
    ];

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
            filteredIntersects[0].object.material.color.set(faceColorsValues[selected]);
            let check = revisedSolver(getDeca())[0];
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
                    <div className={`cp-info-data ${faceColors[selected]}`}></div>
                </div>
            </div>
            <div className="color-menu">
                {faceColors.map((color,i)=>
                    <div 
                        className={`color-button ${color.replace(' ','-')}`} 
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