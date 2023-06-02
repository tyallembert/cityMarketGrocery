import { useState, useEffect } from "react";
import TaskObject from './TaskObject.jsx'
import TaskContainer from './TaskContainer.jsx'
import "../../styles/allDryGoods.scss";

function AllDryGoods(props) {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings)
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.activePage);
    const [employees, setEmployees] = useState(props.employees);

    const [toDoObjects, setToDoObjects] = useState([]);
    const [inProgressObjects, setInProgressObjects] = useState([]);
    const [finishedObjects, setFinishedObjects] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState("")

    useEffect(() => {
        setTasks(props.tasks)
        setActivePage(props.activePage)
        setEmployees(props.employees)
        setTaskSettings(props.taskSettings);
    },[props.tasks, props.activePage])
    useEffect(() => {
        createTaskObjects();
    },[tasks, taskSettings, activePage])

    const updateTasks = (res) => {
        var tempTasks = tasks;
        var id = res.id;
        var type = res.type;
        var task = res.task;
        tempTasks.dryGoods[type][id] = res.task;
        setTasks(tempTasks);
        createTaskObjects();
        fetch("/saveData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempTasks)
        });
    }

    const createTaskObjects = async() => {
        var tempToDo = [];
        var tempProgress = [];
        var tempFinished = [];
        var taskProps = {updateTasks: updateTasks, employees: props.employees, type: "", task: "", id: "000000"}
        var emptyTasks = 0;

        for (var type in tasks.dryGoods){
            if(Object.keys(tasks.dryGoods[type]).length === 0){
                emptyTasks++;
            }
            if(type === activePage && Object.keys(tasks.dryGoods[type]).length === 0){
                emptyTasks = Object.keys(tasks.dryGoods).length;
            }
            taskProps.type = type;
            if(activePage === type || activePage === 'dryGoods'){ //this line checks if its a specific page
                for (var task in tasks.dryGoods[type]){
                    taskProps.id = task;
                    taskProps.task = tasks.dryGoods[type][task];

                    switch(tasks.dryGoods[type][task].status){
                        case "In Progress":
                            tempProgress.push(
                                <TaskObject {...taskProps} key={task}/>
                            )
                            break;
                        case "Finished":
                            tempFinished.push(
                                <TaskObject {...taskProps} key={task}/>
                            )
                            break;
                        default:
                            tempToDo.push(
                                <TaskObject {...taskProps} key={task}/>
                            )
                    }
                }
            }
        }
        if(Object.keys(tasks.dryGoods).length === emptyTasks){
            var message = (
            <div className="emptyMessage">
                <h2>No tasks yet for today</h2>
            </div>
            )
            setEmptyMessage(message)
        }else{
            setEmptyMessage(null);
        }
        setToDoObjects(tempToDo);
        setInProgressObjects(tempProgress);
        setFinishedObjects(tempFinished);
    }
    return (
        <div className="dryGoodsContainer">
            <div className="dryGoodsOptionsContainer">
                {
                    Object.keys(taskSettings.dryGoods.components).map((value) => {
                        if(value === activePage || activePage === 'dryGoods'){
                            return (
                                <TaskContainer key={value} updateTasks={updateTasks} employees={employees} taskSettings={taskSettings} activePage={value}/>
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