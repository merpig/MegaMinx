import 'rc-slider/assets/index.css';
import './SpeedSlider.css';
import React, { useState } from 'react';
import Slider from 'rc-slider'

const style = { width: "20%", position: "fixed", top: "85px", left: "10px",fontSize:"1rem"};

let speedToValue = speed => {
    switch(speed){
        case .25:
            return 0;
        case .5:
            return 1;
        case 1:
            return 2;
        case 3:
            return 3;
        case 6:
            return 4;
        case 12:
            return 5;
        case 24:
            return 6;
        case 72:
            return 7;
        default:
    }
}

const SpeedSlider = ({speed,setSpeed}) => {
    const [current,setCurrent] = useState(speedToValue(speed()))
    return (<div className="slider-div" style = {style}>
        <Slider 
            defaultValue={current} 
            value={current}
            min={0} max={7} 
            step={1}
            onChange={newSpeed=> {
                setSpeed(newSpeed);
                setCurrent(newSpeed);
            }}
        />
        <div className="speed-label">
            Speed
        </div>
    </div>)
}
;

export default SpeedSlider;