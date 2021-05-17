import "./UndoRedo.css";

const UndoRedo = ({setIndex})=> {
    return (
        <div className="undo-redo-container">
            <div className="undo-redo-button" onClick={()=>setIndex(-1)}>
                Undo
            </div>
            <div className="undo-redo-button" onClick={()=>setIndex(1)}>
                Redo
            </div>
        </div>
    )
}

export default UndoRedo;