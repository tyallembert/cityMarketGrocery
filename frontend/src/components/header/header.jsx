import { useState, useEffect } from "react";
import AddTask from "../addTask/AddTask";
import "./header.scss";
import { GiBrokenBottle } from "react-icons/gi";
import ShrinkLog from "./ShrinkLog";

function Header(props) {
    const [dateState, setDateState] = useState(new Date());
    const [activePage, setActivePage] = useState(props.activePage);
    const [activePageParent, setActivePageParent] = useState(props.activePageParent);
    const [navSettings, setNavSettings] = useState(props.navSettings);
    const [pageTitle, setPageTitle] = useState("");
    
    useEffect(() => {
        setActivePage(props.activePage);
        setActivePageParent(props.activePageParent);
        setNavSettings(props.navSettings);
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
    }, [navSettings, activePage, activePageParent])
    const getHeaderFromSettings = () => {
        console.log("PARENT: "+activePageParent);
        console.log("PAGE: "+activePageParent);
        if(activePageParent !== ""){
            console.log("went through if")
            setPageTitle(props.navSettings[activePageParent].components[activePage].title)
        }else{
            console.log("went through else")
            setPageTitle(props.navSettings[activePage].title);
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
                    <ShrinkLog />
                    <AddTask navSettings={props.navSettings} updateCurrentTasks={props.updateCurrentTasks}/>
                </div>
            </div>
        </div>
    )
}

export default Header