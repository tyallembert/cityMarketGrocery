import { useState, useEffect } from "react";
import "./taskObject.scss";

function TaskObject(props) {
    const [task, setTask] = useState(props.task);
    const [type, setType] = useState(props.type);
    const [employees, setEmployees] = useState(props.employees);
    const [employeeOptionObjects, setEmployeeOptionObjects] = useState([]);

    const [classes, setClasses] = useState("");
    const [infoObject, setInfoObject] = useState([]);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        setTask(props.task);
        setType(props.type);
        setEmployees(props.employees);
    },[props.employees])
    useEffect(() => {
        createEmployeeOptions();
    },[task, employees])
    useEffect(() => {
        createObject();
    },[employeeOptionObjects])

    const createEmployeeOptions = () => {
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
    const createObject = () => {
        setClasses("taskObjectContainer " + type)
        switch(task.status){
            case 'In Progress':
                setInfoObject(
                    <>
                        <div className="elementContainer">
                            <p>{task.name}</p>
                            <p className="title">Name</p>
                        </div>
                        <div className="elementContainer">
                            <p>{task.start}</p>
                            <p className="title">Start time</p>
                        </div>
                        <button className="button doneButton" onClick={handleFinishTask}>Done</button>
                    </>
                    )
                break;
            case 'Finished':
                setInfoObject(
                    <>
                        <div className="elementContainer">
                            <p>{task.name}</p>
                            <p className="title">Name</p>
                        </div>
                        <div className="elementContainer">
                            <p>{task.start}</p>
                            <p className="title">Start time</p>
                        </div>
                        <div className="elementContainer">
                            <p>{task.end}</p>
                            <p className="title">End time</p>
                        </div>
                    </>
                    )
                break;
            default:
                setInfoObject(
                <>
                    <select className="nameInput" name="name" onChange={handleChange}>
                        {employeeOptionObjects}
                    </select>
                    <button className="startButton button" onClick={handleStartTask}>Start</button>
                </>
                )
        }
    }
    const handleChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }
    const handleStartTask = (e) => {
        var tempTask = task;
        const today = new Date();
        const time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        tempTask.start = time;
        tempTask.status = "In Progress";
        setTask(tempTask);
        var id = (Math.random() + 1).toString(36).slice(2,10);
        props.updateTasks({type: type, id: id, task: tempTask});
    }
    const handleFinishTask = () => {
        var tempTask = task;
        const today = new Date();
        const time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        tempTask.end = time;
        tempTask.status = "Finished";
        setTask(tempTask);
        props.updateTasks({type: type, id: props.id, task: tempTask});
    }
    return (
        <div className={classes}>
            <p className="type">{type}</p>
            <div className="elementContainer aisle">
                <p>{task.aisle}</p>
                <p className="title">Aisle</p>
            </div>
            {infoObject}
        </div>
    )
}

export default TaskObject