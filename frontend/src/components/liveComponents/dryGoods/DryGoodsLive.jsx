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
    // const updateTasks = async(res) => {
    //     let newId = res.id;
    //     let tempTasks = {...tasks};
    //     tempTasks["liveFreight"]["dryGoodsLive"][newId] = (res.task);
    //     const response = await fetch("/saveData", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(tempTasks)
    //     });
    //     setTasks(tempTasks)
    // }
    const togglePopup = (res) => {
        setShowingPopUp(res);
    }
    return (
        <div className="dryGoodsLiveContainer">
            <StartButton togglePopup={togglePopup}/>
            {showingPopUp ? (
                <NewAislePopup
                    togglePopup={togglePopup} updateTasks={props.updateTasks} employees={employees} activePage={activePage} />
            ) : (null)
            }
            <GridTable updateTasks={props.updateTasks} newAisleActive={showingPopUp} tasks={tasks}/>
        </div>
    )
}

export default DryGoodsLive