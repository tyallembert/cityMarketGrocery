import { useState, useEffect } from 'react';
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";
import "./newAislePopup.scss";

function NewAislePopup(props) {

    const [employees, setEmployees] = useState(props.employees);
    const [employeeOptionObjects, setEmployeeOptionObjects] = useState([]);
    const [taskInfo, setTaskInfo] = useState({
        name: "",
        aisle: "",
        boxes: "",
        start: "",
        end: "",
        status: "In Progress"
    });
    useEffect(() => {
        setEmployees(props.employees);
    }, [])
    useEffect(() => {
        createEmployeeOptions();
    }, [employees])
    const handleChange = (event) => {
        setTaskInfo({ ...taskInfo, [event.target.name]: event.target.value });
    };
    const createEmployeeOptions = () => {
        console.log(employees);
        var tempObjects = [];
        tempObjects.push(<option key={0} value="choose">Choose</option>);
        for(var id in employees){
            var firstLastInit = employees[id].firstName + " "+ employees[id].lastName[0];
            tempObjects.push(
                <option key={id} value={firstLastInit}>{firstLastInit}</option>
            )
        }
        setEmployeeOptionObjects(tempObjects);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        var today = new Date();
        var time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        var tempTask = {...taskInfo};
        tempTask.start = time;

        const response = await fetch("/saveLiveData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempTask)
        });
        const id = await response.json();
        props.updateTasks([id, tempTask]);

        closePopUp();
    };
    const closePopUp = () => {
        props.handleClick(false);
    };

    return (
        <div className="newAislePopupContainer">
            <div className='background' onClick={closePopUp}></div>
            <form className='formContainer' onSubmit={handleSubmit}>
                <h1 className='formTitle'>New Aisle</h1>
                <label>
                    Name:
                    {/* <input type="text" 
                    name="name"
                    value={taskInfo.name} 
                    onChange={handleChange} 
                    maxLength={10}/> */}
                    <select name="name" onChange={handleChange}>
                        {employeeOptionObjects}
                    </select>
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