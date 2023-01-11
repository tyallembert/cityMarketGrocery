import { useState, useEffect } from "react";
import TaskObject from './TaskObject.jsx'
import "./allToDo.scss";

function AllToDo(props) {
    const [taskSettings, setTaskSettings] = useState([])
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.tasks);

    const [toDoObjects, setToDoObjects] = useState([]);
    const [inProgressObjects, setInProgressObjects] = useState([]);
    const [finishedObjects, setFinishedObjects] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState("")

    useEffect(() => {
        setTasks(props.tasks)
        setActivePage(props.activePage)
        fetchSettings()
    },[props.tasks])
    useEffect(() => {
        createTaskObjects()
    },[tasks, taskSettings])
    useEffect(() => {

    },[toDoObjects, inProgressObjects, finishedObjects])

    const fetchSettings = async() => {
        const response = await fetch("/getAddTaskSettings");
        var data = await response.json();
        var tempSettings = []; // ['upstock', 'backstock', ...]
        for (var i in data){
            tempSettings.push(i);
        }
        setTaskSettings(tempSettings);
    }

    const updateTasks = (res) => {
        console.log("got to here from task page")
        var tempTasks = tasks;
        var id = res.id;
        var type = res.type;
        var task = res.task;
        tempTasks[type][id] = res.task;
        console.log(id)
        console.log(type)
        console.log(task)
        setTasks(tempTasks);
        createTaskObjects();
        fetch("/saveTask", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, type: type, task: task})
        });
    }

    const createTaskObjects = async() => {
        var isEmpty = true;
        var tempToDo = [];
        var tempProgress = [];
        var tempFinished = [];
        var taskProps = {updateTasks: updateTasks, type: "", task: "", id: "000000"}
        for (var type in tasks){
            if(activePage === 'all' || Object.keys(tasks[activePage]).length !== 0){
                taskProps.type = type;
                isEmpty = false;
                if(taskSettings.includes(type)){
                    if(activePage === type || activePage === 'all'){ //this line checks if its a specific page
                        for (var task in tasks[type]){
                            taskProps.id = task;
                            taskProps.task = tasks[type][task];
    
                            switch(tasks[type][task].status){
                                case "To Do":
                                    tempToDo.push(
                                        <TaskObject {...taskProps} key={task}/>
                                    )
                                    break;
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
            }
        }
        if(isEmpty){
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
        <div className="allToDoContainer">
            <div className="headerRow">
                <div className="headerToDo">
                    <p>To Do</p>
                </div>
                <div className="headerInProgress">
                    <p>In Progress</p>
                </div>
                <div className="headerFinished">
                    <p>Finshed</p>
                </div>
            </div>

            <div className="tableColumns">
                {emptyMessage}
                <div className="column toDoContainer">
                    {toDoObjects}
                </div>
                <div className="column inProgressContainer">
                    {inProgressObjects}
                </div>
                <div className="column finishedContainer">
                    {finishedObjects}
                </div>
            </div>
        </div>
    )
}

export default AllToDo