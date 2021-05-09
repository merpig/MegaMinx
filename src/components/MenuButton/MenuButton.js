import "./MenuButton.css";

const MenuButton = props => {
    const className = props.children?"menu-button":" menu-button hidden";
    return(
        <div className="menu-button-container">
            <div className={className} onClick={props.onClick}>
                {props.children}
            </div>
        </div>
    );
}

export default MenuButton;