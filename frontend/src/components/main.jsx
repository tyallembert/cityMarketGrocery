import { useEffect, useState } from "react";
import "./main.scss";
import LiveFreight from "./liveComponents/LiveFreight.jsx";
import AllToDo from "./afterLiveComponents/AllToDo.jsx";

function Main(props) {
    const [activePage, setActivePage] = useState(props.activePage);
    const [tasks, setTasks] = useState(props.tasks);
    const [employees, setEmployees] = useState(props.employees);
    useEffect(() => {
        setActivePage(props.activePage);
        setTasks(props.tasks);
        setEmployees(props.employees);
    }, [props.activePage, props.tasks])
    

    return (
        <div className="mainContainer">
            {
                (activePage === "liveFreight") ? 
                (
                    <LiveFreight tasks={tasks.liveFreight} employees={employees}/>
                ): 
                (
                    <AllToDo tasks={tasks} activePage={activePage} employees={employees}/>
                )
            }
        </div>
    )
}

export default Main