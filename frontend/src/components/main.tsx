import React from "react";
import "../styles/main.scss";
import LiveFreight from "./liveComponents/LiveFreight.tsx";
import AllDryGoods from "./afterLiveComponents/AllDryGoods.tsx";
import { Employee } from "../types.ts";

type Props = {
    activePage: string,
    activePageParent: string,
    tasks: any,
    employees: Employee[],
    taskSettings: any,
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}
const Main: React.FC<Props> = (props) => {

    return (
        <div className="mainContainer">
            {
                (props.activePageParent === "liveFreight" || props.activePage === "liveFreight") ? 
                (
                    <LiveFreight updateTasks={props.updateTasks} activePage={props.activePage} taskSettings={props.taskSettings} tasks={props.tasks} employees={props.employees}/>
                ): 
                (
                    <AllDryGoods updateTasks={props.updateTasks} tasks={props.tasks} taskSettings={props.taskSettings} activePage={props.activePage} activePageParent={props.activePageParent} employees={props.employees}/>
                )
            }
        </div>
    )
}

export default Main