import React, { useState, useEffect } from "react";
import TaskObject from './TaskObject.tsx'
import TaskContainer from './TaskContainer.tsx'
import "../../styles/allDryGoods.scss";
import { Employee, Tasks } from "../../types.ts";

type Props = {
    updateTasks: (task: any, id: string, type: string, subType: string) => void,
    activePage: string,
    activePageParent: string,
    tasks: Tasks,
    employees: Employee[],
    taskSettings: any
}
const AllDryGoods: React.FC<Props> = (props) => {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings)
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.activePage);
    const [employees, setEmployees] = useState(props.employees);

    const [toDoObjects, setToDoObjects] = useState<JSX.Element[]>([]);
    const [inProgressObjects, setInProgressObjects] = useState<JSX.Element[]>([]);
    const [finishedObjects, setFinishedObjects] = useState<JSX.Element[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("")

    useEffect(() => {
        setTasks(props.tasks)
        setActivePage(props.activePage)
        setEmployees(props.employees)
        setTaskSettings(props.taskSettings);
    },[props.tasks, props.activePage])
    useEffect(() => {
        createTaskObjects();
    },[tasks, props.activePage, props.activePageParent])

    // const updateTasks = (res: any) => {
    //     var tempTasks = {...tasks};
    //     var id = res.id;
    //     var type = res.type;
    //     tempTasks[props.activePageParent][type][id] = res.task;
    //     setTasks(tempTasks);
    //     createTaskObjects();
    //     fetch("/saveData", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(tempTasks)
    //     });
    // }

    const createTaskObjects = async() => {
        var tempToDo: JSX.Element[] = [];
        var tempProgress: JSX.Element[] = [];
        var tempFinished: JSX.Element[] = [];
        var taskProps = {newTaskStarted: null, updateTasks: props.updateTasks, taskSettings: taskSettings, employees: props.employees, type: "", parentType: "", task: "", id: "000000"}
        var emptyTasks = 0;

        for (var type in tasks[props.activePageParent as keyof Tasks]){
            if(Object.keys(tasks[props.activePageParent as keyof Tasks][type]).length === 0){
                emptyTasks++;
            }
            if(type === activePage && Object.keys(tasks[props.activePageParent as keyof Tasks][type]).length === 0){
                emptyTasks = Object.keys(tasks[props.activePageParent as keyof Tasks]).length;
            }
            taskProps.parentType = props.activePageParent;
            taskProps.type = type;
            if(tasks[props.activePageParent as keyof Tasks][type] !== undefined && (type === props.activePage || props.activePage === "")){
                for (var task in tasks[props.activePageParent as keyof Tasks][type]){
                    taskProps.id = task;
                    taskProps.task = (tasks[props.activePageParent as keyof Tasks] as any)[type][task];
                    
                    var tempTaskObject = <TaskObject {...taskProps} key={task}/>

                    switch((tasks[props.activePageParent as keyof Tasks] as any)[type][task].status){
                        case "In Progress":
                            tempProgress.push(tempTaskObject)
                            break;
                        case "Finished":
                            tempFinished.push(tempTaskObject)
                            break;
                        default:
                            tempToDo.push(tempTaskObject)
                    }
                }
            }
        }
        if(Object.keys(tasks[props.activePageParent as keyof Tasks]).length === emptyTasks){
            var message:any = (
            <div className="emptyMessage">
                <h2>No tasks yet for today</h2>
            </div>
            )
            setEmptyMessage(message)
        }else{
            setEmptyMessage("");
        }
        setToDoObjects(tempToDo);
        setInProgressObjects(tempProgress);
        setFinishedObjects(tempFinished);
    }
    return (
        <div className="dryGoodsContainer">
            <div className="dryGoodsOptionsContainer">
                {
                    Object.keys(taskSettings[props.activePageParent].components).map((value) => {
                        if(value === activePage || activePage === ""){
                            return (
                                <TaskContainer key={value} updateTasks={props.updateTasks} employees={employees} taskSettings={taskSettings} activePage={value} activePageParent={props.activePageParent}/>
                            )
                        }
                    })
                }
            </div>
            <div className="allToDoContainer">
                <div className="headerRow">
                    <div className="headerInProgress">
                        <p>In Progress</p>
                    </div>
                    <div className="headerFinished">
                        <p>Finshed</p>
                    </div>
                </div>

                <div className="tableColumns">
                    {emptyMessage}
                    <div className="column inProgressContainer">
                        {inProgressObjects}
                    </div>
                    <div className="column finishedContainer">
                        {finishedObjects}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllDryGoods