import { useState, useEffect } from "react";
import TaskObject from './TaskObject.jsx'
import TaskContainer from './TaskContainer.jsx'
import "./allDryGoods.scss";

function AllDryGoods(props) {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings)
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.tasks);
    const [employees, setEmployees] = useState(props.tasks);

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
    },[tasks, taskSettings])
    useEffect(() => {

    },[toDoObjects, inProgressObjects, finishedObjects])

    const updateTasks = (res) => {
        console.log("got to here from task page")
        var tempTasks = tasks;
        var id = res.id;
        var type = res.type;
        var task = res.task;
        tempTasks[type][id] = res.task;
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
        var taskProps = {updateTasks: updateTasks, employees: props.employees, type: "", task: "", id: "000000"}
        var emptyTasks = 0;

        for (var type in tasks){
            if(props.activePage === 'all' || Object.keys(tasks[props.activePage]).length !== 0){
                if(Object.keys(tasks[type]).length === 0){
                    emptyTasks++;
                }
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
        if(isEmpty || Object.keys(tasks).length === emptyTasks){
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
                        return (
                            <TaskContainer updateTasks={updateTasks} taskSettings={taskSettings} activePage={value}/>
                        )
                    })
                }
            </div>
            <div className="allToDoContainer">
                <div className="headerRow">
                    {/* <div className="headerToDo">
                        <p>To Do</p>
                    </div> */}
                    <div className="headerInProgress">
                        <p>In Progress</p>
                    </div>
                    <div className="headerFinished">
                        <p>Finshed</p>
                    </div>
                </div>

                <div className="tableColumns">
                    {emptyMessage}
                    {/* <div className="column toDoContainer">
                        {toDoObjects}
                    </div> */}
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