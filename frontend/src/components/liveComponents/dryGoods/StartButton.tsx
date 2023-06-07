import React from "react";
import "../../../styles/startButton.scss";

type Props = {
    togglePopup: any
}

const StartButton: React.FC<Props> = (props) => {
    return (
        <div className="startButtonContainer">
            <button onClick={()=>{props.togglePopup(true)}}>Start Aisle</button>
        </div>
    )
}

export default StartButton;