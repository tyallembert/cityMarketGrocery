import { useEffect, useState } from "react";
import "./main.scss";
import LiveFreight from "./liveComponents/LiveFreight.jsx";
import AllDryGoods from "./afterLiveComponents/AllDryGoods.jsx";
import { GiConsoleController } from "react-icons/gi";

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
                    <LiveFreight activePage={activePage} taskSettings={props.taskSettings} tasks={tasks} employees={employees}/>
                ): 
                (
                    <AllDryGoods tasks={tasks} taskSettings={props.taskSettings} activePage={activePage} employees={employees}/>
                )
            }
        </div>
    )
}

export default Main