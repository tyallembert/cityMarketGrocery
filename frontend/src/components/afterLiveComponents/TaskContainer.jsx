import { useState, useEffect } from "react";
import "./taskContainer.scss";
import TaskObject from "./TaskObject";

function TaskContainer(props) {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    const [activePage, setActivePage] = useState(props.activePage);

    useEffect(() => {
        setTaskSettings(props.taskSettings);
        setActivePage(props.activePage);
    }, [props.taskSettings, props.activePage])
    return (
        <div className={"tasksContainerWrapper "+activePage}>
            <h1>{taskSettings.dryGoods.components[activePage].title}</h1>
            {
                Object.keys(taskSettings.dryGoods.components[activePage].options).map((value) => {
                    var aisleValue = taskSettings.dryGoods.components[activePage].options[value];
                    return (
                        <TaskObject updateTasks={props.updateTasks} 
                            task={{name: "", aisle: aisleValue, start: "", end: ""}}
                            employees={props.employees} 
                            key={value}/>
                    )
                })
            }
        </div>
    )
}

export default TaskContainer