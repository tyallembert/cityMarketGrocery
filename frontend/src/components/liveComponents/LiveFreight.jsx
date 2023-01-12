import { useState } from 'react';
import "./liveFreight.scss";
import GridTable from './GridTable';
import StartButton from './StartButton';
import NewAislePopup from './NewAislePopup';

function LiveFreight(props) {
    const [showingPopUp, setShowingPopUp] = useState(false);
    const [tasks, setTasks] = useState(props.tasks);
    const [employees, setEmployees] = useState(props.employees);

    const updateTasks = (res) => {
        let r = res[0];
        let tempTasks = tasks;
        tempTasks[r] = (res[1]);
        setTasks(tempTasks)
    }
    const handleClick = (res) => {
        setShowingPopUp(res);
    }
    return (
        <div className="liveFreightContainer">
            <StartButton handleClick={handleClick}/>
            {showingPopUp ? (
                <NewAislePopup handleClick={handleClick} updateTasks={updateTasks} employees={employees} />
            ) : (null)
            }
            <GridTable newAisleActive={showingPopUp} tasks={tasks}/>
        </div>
    )
}

export default LiveFreight