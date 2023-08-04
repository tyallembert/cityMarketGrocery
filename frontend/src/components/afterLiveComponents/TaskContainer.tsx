import React, { useState, useEffect } from "react";
import "../../styles/taskContainer.scss";
import TaskObject from "./TaskObject";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import { Employee } from "../../types";

type Props = {
    taskSettings: any,
    activePage: string,
    activePageParent: string,
    updateTasks: any,
    employees: Employee[]
}
const TaskContainer: React.FC<Props> = (props) => {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    const [showingTasks, setShowingTasks] = useState(false);

    useEffect(() => {
        setTaskSettings(props.taskSettings);
    }, [props.taskSettings])

    const newTaskStarted = (res:any) => {
        setShowingTasks(!showingTasks);
        props.updateTasks(res.task, res.id, res.parentType, res.type);
    }
    const toggleShowNewTasks = (e:any) => {
        if(e.currentTarget.className.split(" ")[0] === "taskHeaderContainer"){
            setShowingTasks(!showingTasks);
        }
    }
    return (
        <div className={showingTasks ? ("tasksContainerWrapper activeTaskContainer " + props.activePage):("tasksContainerWrapper " + props.activePage)}>
            <div className="taskHeaderContainer" onClick={toggleShowNewTasks}>
                <h1 className="header">{taskSettings[props.activePageParent].components[props.activePage].title}</h1>
                {showingTasks ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            {
                showingTasks ? (
                    Object.keys(taskSettings[props.activePageParent].components[props.activePage].options).map((value) => {
                        var aisleValue = taskSettings[props.activePageParent].components[props.activePage].options[value];
                        return (
                            <TaskObject newTaskStarted={newTaskStarted} 
                                updateTasks={props.updateTasks}
                                task={{name: "", aisle: aisleValue, start: "", end: ""}}
                                parentType={props.activePageParent}
                                type={props.activePage}
                                employees={props.employees} 
                                taskSettings={taskSettings}
                                id={value}
                                key={value}/>
                        )
                    })
                ) : (null)
            }
        </div>
    )
}

export default TaskContainer