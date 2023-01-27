import { useState, useEffect } from "react";
import AddTask from "../addTask/AddTask";
import "./shrinkLog.scss";
import { GiBrokenBottle } from "react-icons/gi";

function ShrinkLog(props) {
    const [dateState, setDateState] = useState(new Date());
    const [activePage, setActivePage] = useState(props.activePage);
    
    useEffect(() => {
        setActivePage(props.activePage)
        setInterval(() => setDateState(new Date()), 3000);
    }, [props.activePage]);
    return (
        <div className="shrinkLogContainer">
            <button className="shrinkButton">
                <GiBrokenBottle />
            </button>
        </div>
    )
}

export default ShrinkLog