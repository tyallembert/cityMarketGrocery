import React, { useState, useEffect } from "react";
import AddTask from "../addTask/AddTask";
import "../../styles/header.scss";
import { GiBrokenBottle } from "react-icons/gi";
import ShrinkLog from "./ShrinkLog";
import { Employee } from "../../types";
import HelpPage from "./HelpPage";

type Props = {
    activePage: string,
    activePageParent: string,
    taskSettings: any,
    employees: Employee[]
}

const Header: React.FC<Props> = (props) => {
    const [dateState, setDateState] = useState(new Date());
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 3000);
    }, []);

    useEffect(() => {
        getHeaderFromSettings();
    }, [props.taskSettings, props.activePage, props.activePageParent])

    const getHeaderFromSettings = () => {
        if(props.activePage !== ""){
            setPageTitle(props.taskSettings[props.activePageParent].components[props.activePage].title)
        }else{
            setPageTitle(props.taskSettings[props.activePageParent].title);
        }
    }
    return (
        <div className={"headerContainer "+props.activePage}>
            <div className="dateContainer">
                <div className="top">
                    <p className="day">
                    {dateState.toLocaleDateString('en-GB', {
                        weekday: 'long'
                    })},
                    </p>
                    <p className="fullDate">
                    {dateState.toLocaleDateString('en-US', {
                        date: 'short'
                    })}
                    </p>
                </div>
                <p className="time">
                {dateState.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
                </p>
            </div>
            <div className="titleContainer">
                <h1>{pageTitle}</h1>
                <div className="buttonsContainer">
                    <ShrinkLog employees={props.employees}/>
                    <HelpPage/>
                </div>
            </div>
        </div>
    )
}

export default Header