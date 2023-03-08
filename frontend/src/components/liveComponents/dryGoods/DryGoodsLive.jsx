import { useState, useEffect } from 'react';
import "./dryGoodsLive.scss";
import GridTable from './GridTable';
import StartButton from './StartButton';
import NewAislePopup from './NewAislePopup';

function DryGoodsLive(props) {
    const [showingPopUp, setShowingPopUp] = useState(false);
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.activePage);
    const [employees, setEmployees] = useState(props.employees);

    useEffect(() => {
        setActivePage(props.activePage)
        setEmployees(props.employees)
    }, [props.activePage, props.employees])
    const togglePopup = (res) => {
        setShowingPopUp(res);
    }
    return (
        <div className="dryGoodsLiveContainer">
            <StartButton togglePopup={togglePopup}/>
            {showingPopUp ? (
                <NewAislePopup
                    togglePopup={togglePopup} updateTasks={props.updateTasks} employees={employees} activePage={props.activePage} />
            ) : (null)
            }
            <GridTable updateTasks={props.updateTasks} newAisleActive={showingPopUp} tasks={props.tasks}/>
        </div>
    )
}

export default DryGoodsLive