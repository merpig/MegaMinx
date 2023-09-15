import { DivButtonCloseModal, DivModaContainer, DivModalBody, ModalContainer,DivModalTable } from "./styles";
import { useState } from "react";

// 
// Some ModalColorSettings referenced from 
// https://github.com/AdeilsonESilva/MegaMinx/blob/main/src/components/ModalColorsSettings/index.js
// Big thanks to https://github.com/AdeilsonESilva
//

const faceNames = [
    "Face-one",
    "Face-two",
    "Face-three",
    "Face-four",
    "Face-five",
    "Face-six",
    "Face-seven",
    "Face-eight",
    "Face-nine",
    "Face-ten",
    "Face-eleven",
    "Face-twelve"
];

const allowedHex = [
    "a","b","c","d","e","f",
    "A","B","C","D","E","F",
    "0","1","2","3","4","5","6","7","8","9",
    "Backspace"
]

const ModalColorsSettings = ({isOpen,toggleModal,faceColors,setFaceColors}) => {
    const [colors, setColors] = useState(faceColors);
    const [invalid, setInvalid] = useState(false);
    const [validColors, setValidColors] = useState([
        true,true,true,true,
        true,true,true,true,
        true,true,true,true
    ])

    // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const hexToRgb = hex =>
        hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16))

    function handleChangeColor(color,i) {

        const newColors = [
            ...colors.slice(0,i),
            "#"+color.toLowerCase().replace('#',''),
            ...colors.slice(i+1)
        ]

        setColors(newColors);

        // Validators
        let valid = true;
        const tempValidColors = [];
        const rgbColors = [];

        // check hex length, must be 3 or 6
        for(let i = 0; i< newColors.length; i++){
            const colorLength = newColors[i].replace("#","").length;
            rgbColors[i] = colorLength!==6?"":hexToRgb(newColors[i]).join('');
            if(colorLength!==6) {
                valid = false;
                tempValidColors[i] = false;
            }
            else {
                tempValidColors[i] = true;
            }
        }

        // check for duplicate hex values
        if(valid){
            for(let i = 0; i< newColors.length; i++){
                let filteredLength = rgbColors.filter(rgb=>rgb===rgbColors[i]).length;
                if(filteredLength!==1){
                    valid = false;
                    tempValidColors[i] = false;
                }
            }
        }

        setValidColors(tempValidColors);
        setInvalid(!valid);
    }

    const handleKeyDown = event => {
        if(!allowedHex.includes(event.key))
            event.preventDefault()
    };

    function handleChangeColors(){
        if(!invalid){
            setFaceColors(colors);
            closeModal();
        }
    }

    const closeModal = () => {
        toggleModal(false);
    }

    const closeModalAndSave = () => {
        handleChangeColors();
    }

    if(!isOpen) {
        return;
    }

    return (
        <DivModaContainer>
            <ModalContainer>
                <DivModalBody>
                    <div>
                        <div>
                            <div style={{margin:"auto"}}>Color to hex converter: <a target="#" href="https://htmlcolorcodes.com/">https://htmlcolorcodes.com/</a></div>
                            
                            <DivModalTable>
                                <thead>
                                    <tr>
                                        <th>Face</th>
                                        <th>Color</th>
                                        <th>Hex Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {colors.map((_,i)=>
                                        <tr key={i}>
                                            <td>{faceNames[i]} </td>
                                            <td style={{
                                                backgroundColor:`${colors[i]}`,
                                                borderRadius: ".25rem",
                                            }}></td>
                                            <td style={{border: `${!validColors[i]?"2px solid red":"0px"}`}}><input 
                                                type="text" 
                                                maxLength={7} 
                                                defaultValue={colors[i].replace('#','')}
                                                onKeyDown={handleKeyDown}
                                                onChange={event => handleChangeColor(event.target.value,i)}
                                            /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </DivModalTable>
                        </div>

                        <div className="color-options">
                            <DivButtonCloseModal onClick={closeModal}>
                                <strong>Close</strong>
                            </DivButtonCloseModal>

                            {invalid?
                            <DivButtonCloseModal>
                                <strong style={{color: "red"}}>Invalid</strong>
                            </DivButtonCloseModal>:
                            <DivButtonCloseModal onClick={closeModalAndSave}>
                                <strong>Save and close</strong>
                            </DivButtonCloseModal>}
                        </div>
                    </div>
                </DivModalBody>
            </ModalContainer>
        </DivModaContainer>
    )
}

export default ModalColorsSettings;