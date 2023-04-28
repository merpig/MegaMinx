import { useContext } from "react";

import { ColorsContext } from "../../contexts/colors";
import { DivButtonCloseModal, DivColorFace, DivModaContainer, DivModalBody, ModalContainer } from "./styles";
import { useState } from "react";

const ModalColorsSettings = ({isOpen,toggleModal}) => {
    const [newColors, setNewColors] = useState({});
    const {colors, changeColors, colorsArray} = useContext(ColorsContext);

    function handleChangeColor(newColor) {
        setNewColors({...newColors, ...newColor});
    }

    function handleChangeColors(){
        changeColors({...colors, ...newColors})
    }

    const closeModal = () => {
        toggleModal(false);
    }

    const closeModalAndSave = () => {
        handleChangeColors();
        closeModal();
    }

    if(!isOpen) {
        return;
    }

    function firstLetterUppercase(value) {
        return (value.charAt(0).toUpperCase() + value.slice(1)).replace('-', ' ');
    }

    return (
        <DivModaContainer>
            <ModalContainer>
                <DivModalBody>
                    <div>
                        <div>
                            {colorsArray.map((_,i)=>
                                <DivColorFace key={colorsArray[i][0]}>
                                    {firstLetterUppercase(colorsArray[i][0])}: <input type="text" maxLength={7} defaultValue={colorsArray[i][1]} onChange={event => {
                                        handleChangeColor({[colorsArray[i][0]]: event.target.value})
                                    }} />
                                </DivColorFace>
                            )}
                        </div>

                        <div className="color-options">
                            <DivButtonCloseModal onClick={closeModal}>
                                <strong>Close</strong>
                            </DivButtonCloseModal>

                            <DivButtonCloseModal onClick={closeModalAndSave}>
                                <strong>Save and close</strong>
                            </DivButtonCloseModal>
                        </div>
                    </div>
                </DivModalBody>
            </ModalContainer>
        </DivModaContainer>
    )
}

export default ModalColorsSettings;