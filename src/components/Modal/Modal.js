import "./Modal.css";

const Modal = ({modal,toggleModal}) => {
    let closeModal = () => {
        toggleModal(false);
    }
    return (
        modal?
        <div className="modal-wrapper" onClick={closeModal}>
            <div className="modal-container">
                <div className="modal-header">
                    <b>Instructions</b>
                </div>
                <div className="modal-body">
                    Click and drag anywhere not on the megaminx to rotate the camera
                    <hr></hr>
                    Click and drag on any piece except middle pieces to make turns
                    <hr></hr>
                    Author: Sasha Peters
                    <br></br>
                    <a target="#" href="https://www.github.com/merpig">
                        <i className="fa fa-github"></i>
                    </a>
                    <a target="#" href="https://www.github.com/merpig">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <hr></hr>
                    Site design / MegaMinxProgram model © 2021 MegaMinxProgram
                </div>
            </div>
        </div>:[]
    )
}

export default Modal;