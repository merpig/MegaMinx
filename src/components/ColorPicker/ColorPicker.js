import { useState } from "react";
import "./ColorPicker.css";

const ColorPicker = ({setMenuId,setCurrentFunction,setColor,getColor,resetMegaMinx}) => {
    // array of face colors in the order they're generated
    const [selected,setSelected] = useState(0);

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
    ]

    return (
        <div className="color-menu-container">
            <div className="color-menu">
                {faceColors.map((color,i)=>
                    <div 
                        className={`color-button ${color.replace(' ','-')}`} 
                        key={color} 
                        onClick={
                            ()=>{
                                setSelected(i);
                                setColor(faceColorsValues[i]);
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
                        setColor('blue');
                        setCurrentFunction('none');
                        resetMegaMinx();
                    }}
                >
                    <strong>Exit</strong>
                </div>
                <div className="option-button color-check">
                    <strong>Check</strong>
                </div>
            </div>
            
        </div>
        
    )

}

export default ColorPicker;