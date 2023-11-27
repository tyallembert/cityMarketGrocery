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
    employees: {[key: string]: Employee}
}
enum showingStatus{
    showing,
    hidden,
    justOpened
}
const TaskContainer: React.FC<Props> = (props) => {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    const [showingTasks, setShowingTasks] = useState(showingStatus.justOpened);

    useEffect(() => {
        setTaskSettings(props.taskSettings);
    }, [props.taskSettings])

    const newTaskStarted = (res:any) => {
        setShowingTasks(showingStatus.hidden);
        props.updateTasks(res.task, res.id, res.parentType, res.type);
    }
    const toggleShowNewTasks = (e:any) => {
        if(e.currentTarget.className.split(" ")[0] === "taskHeaderContainer"){
            if(showingTasks === showingStatus.showing){
                setShowingTasks(showingStatus.hidden);
            }else{
                setShowingTasks(showingStatus.showing);
            }
        }
    }
    return (
        <div className={showingTasks === showingStatus.justOpened ? ("tasksContainerWrapper " + props.activePage)
        :(showingTasks === showingStatus.showing ? ("tasksContainerWrapper activeTaskContainer " + props.activePage)
        : ("tasksContainerWrapper shrinkAnimation"))}>
            <div className="taskHeaderContainer" onClick={toggleShowNewTasks}>
                <h1 className="header">{taskSettings[props.activePageParent].components[props.activePage].title}</h1>
                {showingTasks === showingStatus.showing ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            {
                showingTasks === showingStatus.showing ? (
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