import { useState, useEffect } from 'react';
import "./liveFreight.scss";
import GridTable from './GridTable';
import StartButton from './StartButton';
import NewAislePopup from './NewAislePopup';

function LiveFreight(props) {
    const [showingPopUp, setShowingPopUp] = useState(false);
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.activePage);
    const [employees, setEmployees] = useState(props.employees);

    useEffect(() => {
        setActivePage(props.activePage)
    }, [props.activePage])
    const updateTasks = async(res) => {
        let newId = res.id;
        let tempTasks = {...tasks};
        tempTasks["liveFreight"]["dryGoodsLive"][newId] = (res.task);
        const response = await fetch("/saveData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempTasks)
        });
        setTasks(tempTasks)
    }
    const togglePopup = (res) => {
        setShowingPopUp(res);
    }
    return (
        <div className="liveFreightContainer">
            <StartButton togglePopup={togglePopup}/>
            {showingPopUp ? (
                <NewAislePopup
                    togglePopup={togglePopup} updateTasks={updateTasks} employees={employees} activePage={activePage} />
            ) : (null)
            }
            <GridTable updateTasks={updateTasks} newAisleActive={showingPopUp} tasks={tasks}/>
        </div>
    )
}

export default LiveFreight