import React, { useState, useEffect } from "react";
import "../../styles/taskContainer.scss";
import TaskObject from "./TaskObject";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {motion} from 'framer-motion';
import {animation__newTaskContainer} from "../animations"

type Props = {
    taskSettings: any,
    activePage: string,
    updateTasks: any
}
const TaskContainer: React.FC<Props> = (props) => {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    const [activePage, setActivePage] = useState(props.activePage);
    const [showingTasks, setShowingTasks] = useState(false);

    useEffect(() => {
        setTaskSettings(props.taskSettings);
        setActivePage(props.activePage);
    }, [props.taskSettings, props.activePage])

    const newTaskStarted = (res:any) => {
        setShowingTasks(!showingTasks);
        props.updateTasks(res);
    }
    const toggleShowNewTasks = (e:any) => {
        if(e.currentTarget.className.split(" ")[0] === "taskHeaderContainer"){
            setShowingTasks(!showingTasks);
        }
    }
    return (
        <motion.div 
        variants={showingTasks ? (animation__newTaskContainer): null}
        initial="hidden"
        animate="visible"
        className={showingTasks ? ("tasksContainerWrapper activeTaskContainer "+activePage):("tasksContainerWrapper "+activePage)}>
            <div className="taskHeaderContainer" onClick={toggleShowNewTasks}>
                <h1 className="header">{taskSettings.dryGoods.components[activePage].title}</h1>
                {showingTasks ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            {
                showingTasks ? (
                    Object.keys(taskSettings.dryGoods.components[activePage].options).map((value) => {
                        var aisleValue = taskSettings.dryGoods.components[activePage].options[value];
                        return (
                            <TaskObject newTaskStarted={newTaskStarted} 
                                updateTasks={props.updateTasks}
                                task={{name: "", aisle: aisleValue, start: "", end: ""}}
                                type={activePage}
                                employees={props.employees} 
                                key={value}/>
                        )
                    })
                ) : (null)
            }
        </motion.div>
    )
}

export default TaskContainer