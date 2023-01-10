import { useEffect, useState } from "react";
import "./main.scss";
import LiveFreight from "./liveComponents/LiveFreight.jsx";
import AllToDo from "./afterLiveComponents/AllToDo.jsx";
import OneToDo from "./afterLiveComponents/OneToDo";

function Main(props) {
    const [activePage, setActivePage] = useState(props.activePage);
    const [tasks, setTasks] = useState(props.tasks);
    useEffect(() => {
        setActivePage(props.activePage);
        setTasks(props.tasks)
    }, [props.activePage, props.tasks])

    const pages = {
        liveFreight: <LiveFreight tasks={tasks.liveFreight}/>,
        all: <AllToDo tasks={tasks} activePage={activePage}/>,
        upstock: <AllToDo tasks={tasks} activePage={activePage}/>,
        backstock: <AllToDo tasks={tasks} activePage={activePage}/>,
        sectors: <AllToDo tasks={tasks} activePage={activePage}/>,
        rounding: <AllToDo tasks={tasks} activePage={activePage}/>,
        bulk: <OneToDo tasks={tasks[activePage]}/>,
        peri: <OneToDo tasks={tasks[activePage]}/>,
        beerWine: <OneToDo tasks={tasks[activePage]}/>
        // backstock: <Backstock tasks={tasks.backstock}/>
    }
    

    return (
        <div className="mainContainer">
            {pages[activePage]}
        </div>
    )
}

export default Main