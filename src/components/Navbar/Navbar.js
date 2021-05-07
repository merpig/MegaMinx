import React from "react";
import "./Navbar.css";
import 'react-dropdown/style.css'
import Popup from "reactjs-popup";

const Navbar = () => {

  return (
    <nav className="navbar navbar-dark fixed-top">
      <ul className="nav nav-justified mr-auto">
        <li className="nav-item nav-fix-for-edge">
          <p className="navbar-brand" style={{ color: "lightgray" }}><b>MegaMinx</b></p>

          {/*Open model here. Show bunch of settings. Pass changeSettings down to component to apply changes*/}
          
        </li>
      </ul>
      <div style={{ float: "right", height: "100%" }} >
        <Popup trigger={<button id="infoBtn">Info</button>}>
          {close => (
            <div style={{ zIndex: "100", width: "100%", height: "100%" }}>
              <div className="shadeBackground" style={{ backgroundColor: "black", zIndex: "101" }} onClick={close}></div>
              <div style={{ zIndex: "102", width: "max-content", margin: "auto", transform: "translateX(-50%)", padding: "8px" }} className="popupDiv">
                <b style={{ fontSize: "2rem" }}>Instructions</b>
                <div className="close" id="closeBtn" onClick={close}>
                  &times;
                </div>
                <div style={{ backgroundColor: "rgba(0,0,0,.8)", height: "100%", marginTop: "0", color: "lightgrey", fontSize: "1rem", textAlign: "center", borderRadius: ".25rem", padding: "8px" }}>
                  <div style={{ paddingTop: "" }}>Click and drag anywhere not on the cube to rotate.</div>
                  <hr style={{ backgroundColor: "lightgray", width: "60%" }}></hr>
                  <div>Click and drag anywhere on the cube to make a move <br></br>or use the keyboard to make turns:</div>

                  <div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                     
                      <p style={{ width: "100%", textAlign: "center" }}>(lower case is clockwise, upper case is counterclockwise)</p>
                    </div>
                  </div>

                  <hr style={{ backgroundColor: "lightgray", width: "60%" }}></hr>

                  <div style={{ marginBottom: "0", paddingBottom: "" }}>
                    Author: Sasha Peters 
                    <br></br> 
                    <a target="#" href="https://www.github.com/merpig">
                      <i className="fa fa-github" style={{ fontSize: "36px", marginRight: "10px" }}></i>
                    </a>
                    <a target="#" href="https://www.linkedin.com/in/alexandr-sasha-peters-8a2489168/">
                      <i className="fa fa-linkedin" style={{ fontSize: "36px" }}></i>
                    </a>
                  </div>

                  <hr style={{ backgroundColor: "lightgrey" }}></hr>

                  <div style={{ color: "white", backgroundColor: "", textAlign: "center" }}>
                      site design / cube © 2020 RubiksProgram
                  </div>

                </div>
              </div>
            </div>
          )}
        </Popup> {" "}
        <button id="fullscreenBtn" value="true">Fullscreen</button>
      </div>
    </nav>)
};

export default Navbar;
