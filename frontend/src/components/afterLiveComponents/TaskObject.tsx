import React, { useState, useEffect, useCallback } from "react";
import "../../styles/taskObject.scss";
import { Employee } from "../../types";

type Props = {
    id: string,
    task: any,
    type: string,
    parentType: string,
    employees: {[key:string]: Employee},
    updateTasks: any,
    newTaskStarted: any,
    taskSettings: any
}

const TaskObject: React.FC<Props> = (props) => {
    const [task, setTask] = useState(props.task);
    const [type, setType] = useState(props.type);
    const [employees, setEmployees] = useState(props.employees);
    const [employeeOptionObjects, setEmployeeOptionObjects] = useState([<></>]);
    const [startDisabled, setStartDisabled] = useState(true);

    const [classes, setClasses] = useState("");
    const [infoObject, setInfoObject] = useState(<></>);

    useEffect(() => {
        setTask(props.task);
        setType(props.type);
        setEmployees(props.employees);
    },[props.employees, props.task, props.type])

    const handleChange = useCallback((event: any) => {
        setTask({ ...task, [event.target.name]: event.target.value });
        if(task.name !== "choose"){
            setStartDisabled(false);
        }else{
            setStartDisabled(true);
        }
    }, [task])
    const handleStartTask = useCallback((e: any) => {
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
        props.newTaskStarted({task: tempTask, id: id, parentType: props.parentType, type: props.type});
    }, [task, props])
    const handleFinishTask = useCallback(() => {
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
        props.updateTasks(tempTask, props.id, props.parentType, props.type);
    }, [task, props]);

    const createEmployeeOptions = useCallback(() => {
        var tempObjects = [];
            tempObjects.push(<option key={0} value="choose">Choose</option>);
            for(var id in employees){
                var firstLastInit = employees[id].firstName + " "+ employees[id].lastName[0];
                tempObjects.push(
                    <option key={id} value={firstLastInit}>{firstLastInit}</option>
                )
            }
            setEmployeeOptionObjects(tempObjects);
    }, [employees]);
    
    const createObject = useCallback(() => {
        setClasses(`taskObjectContainer ${props.type}`)
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
                    <button className="startButton button" onClick={handleStartTask} disabled={startDisabled}>Start</button>
                </>
                )
        }
    }, [employeeOptionObjects, task, type, startDisabled, handleChange, handleFinishTask, handleStartTask]);

    useEffect(() => {
        createEmployeeOptions();
    }, [createEmployeeOptions]);
    
    useEffect(() => {
        createObject();
    }, [createObject]);
    return (
        <div className={classes}>
            {/* {task.status === undefined ? null: (<p className="type">{props.taskSettings[props.parentType].components[props.type].title}</p>)} */}
            {task.status === undefined ? null: (<p className="type">{props.type}</p>)}
            <div className="elementContainer aisle">
                <p>{task.aisle}</p>
                <p className="title">Aisle</p>
            </div>
            {infoObject}
        </div>
    )
}

export default TaskObject