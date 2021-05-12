import 'rc-slider/assets/index.css';
import './SpeedSlider.css';
import React from 'react';
import Slider from 'rc-slider'

const style = { width: "20%", position: "fixed", top: "85px", left: "10px",fontSize:"1rem"};

const SpeedSlider = ({speed,sliderSpeed,setSpeed,setSliderSpeed}) => (
    <div className="slider-div" style = {style}>
        <Slider 
            defaultValue={3} 
            value={sliderSpeed}
            min={0} max={7} 
            step={1}
            onChange={newSpeed=> {
                setSpeed(newSpeed);
                setSliderSpeed(newSpeed)
            }}
        />
        <div className="speed-label">
            Speed
        </div>
    </div>
);

export default SpeedSlider;