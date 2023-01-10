import { useState } from 'react';
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";
import "./newAislePopup.scss";

function NewAislePopup(props) {

    const [taskInfo, setTaskInfo] = useState({
        name: "",
        aisle: "",
        boxes: "",
        start: "",
        end: "",
        status: "In Progress"
    });
    const handleChange = (event) => {
        setTaskInfo({ ...taskInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        var today = new Date();
        var time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        taskInfo.start = time;

        const response = await fetch("/saveLiveData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskInfo)
        });
        const id = await response.json()
        for(var i in id){
            console.log(id[i]);
        }
        console.log("RESPONSE"+id)
        await props.updateTasks([id, taskInfo]);

        closePopUp();
    };
    const closePopUp = () => {
        console.log("going through here")
        props.handleClick(false);
    };

    return (
        <div className="newAislePopupContainer">
            <div className='background' onClick={closePopUp}></div>
            <form className='formContainer' onSubmit={handleSubmit}>
                <h1 className='formTitle'>New Aisle</h1>
                <label>
                    Name:
                    <input type="text" 
                    name="name"
                    value={taskInfo.name} 
                    onChange={handleChange} 
                    maxLength={10}/>
                </label>

                <label>
                    Aisle Number:
                    <input type="text" 
                    name="aisle"
                    value={taskInfo.aisle} 
                    onChange={handleChange} 
                    maxLength={1}/>
                </label>

                <label>
                    Box Count:
                    <input type="text"
                    name="boxes" 
                    value={taskInfo.boxes} 
                    onChange={handleChange} 
                    maxLength={3}/>
                </label>
                <button type="submit">
                    <IoCheckmarkDoneSharp />
                </button>
                <button type='button' onClick={closePopUp}>
                    <IoCloseSharp />
                </button>
            </form>
        </div>
    )
}

export default NewAislePopup;