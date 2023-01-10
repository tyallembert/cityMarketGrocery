import { useEffect, useState } from "react";
import "./oneToDo.scss";

function OneToDo(props) {
    const [activePage, setActivePage] = useState(props.activePage);
    const [tasks, setTasks] = useState(props.tasks);
    useEffect(() => {
        setActivePage(props.activePage);
        setTasks(props.tasks)
    }, [])
    

    return (
        <div className="oneToDoContainer">
            <p>ONE TO DO</p>
            {activePage}
        </div>
    )
}

export default OneToDo