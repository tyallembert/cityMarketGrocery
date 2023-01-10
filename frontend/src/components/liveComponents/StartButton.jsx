import "./startButton.scss";

function StartButton(props) {
    return (
        <div className="startButtonContainer">
            <button onClick={()=>{props.handleClick(true)}}>Start Aisle</button>
        </div>
    )
}

export default StartButton;