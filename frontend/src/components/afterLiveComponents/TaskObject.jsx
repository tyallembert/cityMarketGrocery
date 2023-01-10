import { useState, useEffect } from "react";
import "./taskObject.scss";

function TaskObject(props) {
    const [task, setTask] = useState(props.task);
    const [type, setType] = useState(props.type);
    const [editable, setEditable] = useState(props.editable);

    const [classes, setClasses] = useState("");
    const [infoObject, setInfoObject] = useState([]);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        setTask(props.task);
        setType(props.type);
        setEditable(props.editable);
    },[])
    useEffect(() => {
       createObject();
    },[task])

    const createObject = () => {
        setClasses("taskObjectContainer " + type)
        switch(task.status){
            case 'To Do':
                setInfoObject(
                    <>
                        {
                            editable ? 
                            (
                            <>
                                <input type='text'
                                    name="name"
                                    className="nameInput"
                                    placeholder="Name" 
                                    disabled
                                />
                                <button className="startButton" onClick={handleStartTask} disabled>Start</button>
                            </>
                            )
                            : (
                                <>
                                <input type='text'
                                    name="name"
                                    className="nameInput"
                                    placeholder="Name" 
                                    onChange={handleChange}
                                />
                                <button className="startButton" onClick={handleStartTask}  {...buttonEnabled ? '':'disabled'}>Start</button>
                            </>
                            )
                        }
                    </>
                    )
                break;
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
                        <button className="startButton" onClick={handleFinishTask}>Done</button>
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
                    <input type='text'
                    className="nameInput"
                    placeholder="Name" 
                    onChange={handleChange}/>
                    <button className="startButton" onClick={handleStartTask}>Start</button>
                </>
                )
        }
    }
    const handleChange = (event) => {
        var classes = event.target.className.split(" ");
        editable ? setTask({ ...task, [classes[1]]: event.target.innerText.replace(/(\r\n|\n|\r)/gm, "") }) :
        setTask({ ...task, [event.target.name]: event.target.value });
        console.log(buttonEnabled)
        if(task.name.length > 0){
            setButtonEnabled(true);
        }
        console.log(task)
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
        console.log(tempTask)
        props.updateTasks({type: type, id: props.id, task: tempTask});
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
                { editable ? (
                    <p className="editable aisle" 
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onInput={handleChange}>Edit This</p>
                        ): (<p>{task.aisle}</p>)}
                <p className="title">Aisle</p>
            </div>
            {infoObject}
        </div>
    )
}

export default TaskObject