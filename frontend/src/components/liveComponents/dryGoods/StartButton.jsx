import "../../../styles/startButton.scss";

function StartButton(props) {
    return (
        <div className="startButtonContainer">
            <button onClick={()=>{props.togglePopup(true)}}>Start Aisle</button>
        </div>
    )
}

export default StartButton;