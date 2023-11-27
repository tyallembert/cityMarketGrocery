import React, { useState, useEffect, useCallback } from "react";
import TaskObject from './TaskObject.tsx'
import TaskContainer from './TaskContainer.tsx'
import "../../styles/allDryGoods.scss";
import { DryGoods, DryGoodsTask, Employee, Tasks } from "../../types.ts";

type Props = {
    updateTasks: (task: any, id: string, type: string, subType: string) => void,
    activePage: string,
    activePageParent: string,
    tasks: Tasks,
    employees: {[key: string]: Employee},
    taskSettings: any
}
const AllDryGoods: React.FC<Props> = (props) => {

    const [inProgressObjects, setInProgressObjects] = useState<JSX.Element[]>([]);
    const [finishedObjects, setFinishedObjects] = useState<JSX.Element[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("")

    const createTaskObjects = useCallback(() => {
        var tempProgress: JSX.Element[] = [];
        var tempFinished: JSX.Element[] = [];
        var emptyCategories = 0;

        const parentCategory = props.tasks[props.activePageParent as keyof Tasks];
        if(props.activePage === "") {
            Object.keys(parentCategory).forEach((type) => {
                const category = parentCategory[type];
                if(Object.keys(category).length !== 0){
                    Object.keys(category).forEach((task) => {
                        setEmptyMessage("");
                        const taskObject = category[task];
                        if(taskObject.status === "In Progress"){
                            tempProgress.push(<TaskObject newTaskStarted={null} updateTasks={props.updateTasks} taskSettings={props.taskSettings} employees={props.employees} key={task} id={task} task={taskObject} type={type} parentType={props.activePageParent}/>)
                        }else{
                            tempFinished.push(<TaskObject newTaskStarted={null} updateTasks={props.updateTasks} taskSettings={props.taskSettings} employees={props.employees} key={task} id={task} task={taskObject} type={type} parentType={props.activePageParent}/>)
                        }
                    })
                }else {
                    emptyCategories++;
                }
            })
            if(emptyCategories === Object.keys(parentCategory).length){
                var message:any = (
                <div className="emptyMessage">
                    <h2>No tasks yet for today</h2>
                </div>
                )
                setEmptyMessage(message);
            }
        }else {
            const category = parentCategory[props.activePage as keyof DryGoods];
            if(Object.keys(category).length !== 0){
                Object.keys(category).forEach((task) => {
                    const taskObject = category[task];
                    if(taskObject.status === "In Progress"){
                        tempProgress.push(<TaskObject newTaskStarted={null} updateTasks={props.updateTasks} taskSettings={props.taskSettings} employees={props.employees} key={task} id={task} task={taskObject} type={props.activePage} parentType={props.activePageParent}/>)
                    }else{
                        tempFinished.push(<TaskObject newTaskStarted={null} updateTasks={props.updateTasks} taskSettings={props.taskSettings} employees={props.employees} key={task} id={task} task={taskObject} type={props.activePage} parentType={props.activePageParent}/>)
                    }
                })
                setEmptyMessage("");
            }else {
                var message:any = (
                <div className="emptyMessage">
                    <h2>No tasks yet for today</h2>
                </div>
                )
                setEmptyMessage(message);
            }
        }
        setInProgressObjects(tempProgress);
        setFinishedObjects(tempFinished);
    },[props.tasks, props.activePage, props.activePageParent, props.employees, props.taskSettings, props.updateTasks])

    useEffect(() => {
        createTaskObjects();
    },[createTaskObjects])

    return (
        <div className="dryGoodsContainer">
            <div className="dryGoodsOptionsContainer">
                {
                    Object.keys(props.taskSettings[props.activePageParent].components).map((value) => {
                        if(value === props.activePage || props.activePage === ""){
                            return (
                                <TaskContainer key={value} updateTasks={props.updateTasks} employees={props.employees} taskSettings={props.taskSettings} activePage={value} activePageParent={props.activePageParent}/>
                            )
                        }
                        return null;
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