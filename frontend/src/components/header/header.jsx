import { useState, useEffect } from "react";
import AddTask from "../addTask/AddTask";
import "./header.scss";
import { GiBrokenBottle } from "react-icons/gi";
import ShrinkLog from "./ShrinkLog";

function Header(props) {
    const [dateState, setDateState] = useState(new Date());
    const [activePage, setActivePage] = useState(props.activePage);
    
    useEffect(() => {
        setActivePage(props.activePage)
        setInterval(() => setDateState(new Date()), 3000);
    }, [props.activePage]);
    return (
        <div className={["headerContainer "+activePage]}>
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
                <h1>{props.navSettings[activePage].title}</h1>
                <div className="buttonsContainer">
                    <ShrinkLog />
                    <AddTask navSettings={props.navSettings} updateCurrentTasks={props.updateCurrentTasks}/>
                </div>
            </div>
        </div>
    )
}

export default Header