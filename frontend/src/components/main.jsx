import { useEffect, useState } from "react";
import "../styles/main.scss";
import LiveFreight from "./liveComponents/LiveFreight.jsx";
import AllDryGoods from "./afterLiveComponents/AllDryGoods.jsx";
import { GiConsoleController } from "react-icons/gi";

function Main(props) {
    // const [activePage, setActivePage] = useState(props.activePage);
    // const [activePageParent, setActivePageParent] = useState(props.activePageParent);
    // const [tasks, setTasks] = useState(props.tasks);
    // const [employees, setEmployees] = useState(props.employees);
    // useEffect(() => {
    //     setActivePage(props.activePage);
    //     setTasks(props.tasks);
    //     setEmployees(props.employees);
    //     setActivePageParent(props.activePageParent);
    // }, [props.activePage, props.activePageParent, props.tasks, props.employees])
    

    return (
        <div className="mainContainer">
            {
                (props.activePageParent === "liveFreight" || props.activePage === "liveFreight") ? 
                (
                    <LiveFreight activePage={props.activePage} taskSettings={props.taskSettings} tasks={props.tasks} employees={props.employees}/>
                ): 
                (
                    <AllDryGoods tasks={props.tasks} taskSettings={props.taskSettings} activePage={props.activePage} employees={props.employees}/>
                )
            }
        </div>
    )
}

export default Main