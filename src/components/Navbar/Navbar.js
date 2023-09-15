import React, { useState } from "react";
import "./Navbar.css";
import 'react-dropdown/style.css';
import Modal from "../Modal/Modal";
import ModalColorsSettings from "../ModalColorsSettings";

const Navbar = ({menuId,faceColors,setFaceColors,currentFunction}) => {

  let [modal,toggleModal] = useState(false);
  const [modalSettings,toggleModalSettings] = useState(false);

  return (
    <nav className="navbar navbar-dark fixed-top">

      <ul className="nav nav-justified mr-auto">
        <li className="nav-item nav-fix-for-edge">
          <p className="navbar-brand" style={{ color: "lightgray" }}><b>MegaMinx</b></p>
        </li>
      </ul>

      <div style={{ float: "right", height: "100%" }} >
        <button id="infoBtn" onClick={()=>toggleModal(true)}>Info</button>
        {
          !menuId&&
          <button id="colorsSettings" onClick={()=>{
            if(currentFunction()==="none")
              return toggleModalSettings(true)}
          }>Color settings</button>
        }
        <button id="fullscreenBtn" value="true">Fullscreen</button>
        <Modal modal={modal} toggleModal={toggleModal} />
        {
          !menuId&&
          <ModalColorsSettings 
            isOpen={modalSettings} 
            toggleModal={toggleModalSettings}
            menuId={menuId}
            faceColors={faceColors}
            setFaceColors={setFaceColors}
          />
        }
      </div>

    </nav>)
};

export default Navbar;
