import { useEffect, useState } from "react";
import React from "react";
import "../styles/main.scss";
import LiveFreight from "./liveComponents/LiveFreight.tsx";
import AllDryGoods from "./afterLiveComponents/AllDryGoods.tsx";
import { GiConsoleController } from "react-icons/gi";

type Props = {
    activePage: string,
    activePageParent: string,
    tasks: any,
    employees: any,
    taskSettings: any,
    saveData: (data: any) => void
}
const Main: React.FC<Props> = (props) => {
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