import { useEffect, useState } from "react";
import "./main.scss";
import LiveFreight from "./liveComponents/LiveFreight.jsx";
import AllToDo from "./afterLiveComponents/AllToDo.jsx";

function Main(props) {
    const [activePage, setActivePage] = useState(props.activePage);
    const [activePageParent, setActivePageParent] = useState(props.activePageParent);
    const [tasks, setTasks] = useState(props.tasks);
    const [employees, setEmployees] = useState(props.employees);
    useEffect(() => {
        setActivePage(props.activePage);
        setTasks(props.tasks);
        setEmployees(props.employees);
        setActivePageParent(props.activePageParent);
    }, [props.activePage, props.activePageParent, props.tasks])
    

    return (
        <div className="mainContainer">
            {
                (activePageParent === "liveFreight" || activePage === "liveFreight") ? 
                (
                    <LiveFreight activePage={activePage} tasks={tasks} employees={employees}/>
                ): 
                (
                    <AllToDo tasks={tasks} activePage={activePage} employees={employees}/>
                )
            }
        </div>
    )
}

export default Main