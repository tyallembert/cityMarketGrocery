import { useState, useEffect } from "react";
import AddTask from "../addTask/AddTask";
import "./header.scss";
import { GiBrokenBottle } from "react-icons/gi";
import ShrinkLog from "./ShrinkLog";

function Header(props) {
    const [dateState, setDateState] = useState(new Date());
    const [activePage, setActivePage] = useState(props.activePage);
    const [activePageParent, setActivePageParent] = useState(props.activePageParent);
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    const [pageTitle, setPageTitle] = useState("");
    
    useEffect(() => {
        setActivePage(props.activePage);
        setActivePageParent(props.activePageParent);
        setTaskSettings(props.taskSettings);
    }, [])
    useEffect(() => {
        setActivePage(props.activePage)
        setActivePageParent(props.activePageParent)
    }, [props.activePage, props.activePageParent])
    useEffect(() => {
        setActivePage(props.activePage)
        setActivePageParent(props.activePageParent)
        setInterval(() => setDateState(new Date()), 3000);
    }, [props.activePage]);
    useEffect(() => {
        getHeaderFromSettings();
    }, [taskSettings, activePage, activePageParent])
    const getHeaderFromSettings = () => {
        if(activePageParent !== ""){
            setPageTitle(props.taskSettings[activePageParent].components[activePage].title)
        }else{
            setPageTitle(props.taskSettings[activePage].title);
        }
    }
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
                <h1>{pageTitle}</h1>
                <div className="buttonsContainer">
                    <ShrinkLog employees={props.employees}/>
                    {/* <AddTask taskSettings={props.taskSettings} updateCurrentTasks={props.updateCurrentTasks}/> */}
                </div>
            </div>
        </div>
    )
}

export default Header