import React, { useState, useEffect, ChangeEvent } from 'react';
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";
import "../../../styles/newAislePopup.scss";
import EmployeeSelect from '../../EmployeeSelect';
type Props = {
    togglePopup: any,
    employees: any,
    activePage: string,
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}
const NewAislePopup: React.FC<Props> = (props) => {

    const [employees, setEmployees] = useState(props.employees);
    const [employeeOptionObjects, setEmployeeOptionObjects] = useState([]);
    const [liveSettings, setLiveSettings] = useState([]);
    const [liveSettingsOptions, setLiveSettingsOptions] = useState([]);
    const [activePage, setActivePage] = useState(props.activePage);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [taskInfo, setTaskInfo] = useState({
        name: "",
        aisle: "",
        boxes: "",
        totes: "",
        start: "",
        end: "",
        status: "In Progress"
    });

    useEffect(() => {
        setEmployees(props.employees);
        setActivePage(props.activePage);
        fetchLiveSettings();
    }, [props.employees])

    useEffect(() => {
        createEmployeeOptions();
    }, [employees])

    useEffect(() => {
        createLiveSettings();
    }, [liveSettings, activePage])

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        if(taskInfo.name !== "Choose" && taskInfo.aisle !== "Choose" && taskInfo.boxes !== "" && taskInfo.totes !== ""){
            setSubmitDisabled(false);
        }else{
            setSubmitDisabled(true);
        }
        setTaskInfo({ ...taskInfo, [event.target.name]: event.target.value });
    };

    const fetchLiveSettings = async() => {
        const data = await fetch('/getLiveSettings');
        const tempLiveSettings = await data.json();
        setLiveSettings(tempLiveSettings);
    }

    const createEmployeeOptions = () => {
        var tempObjects = [];
        tempObjects.push(<option key={0} value="choose">Choose</option>);
        for(var id in employees){
            var firstLastInit = employees[id].firstName + " "+ employees[id].lastName[0];
            tempObjects.push(
                <option key={id} value={firstLastInit}>{firstLastInit}</option>
            )
        }
        setEmployeeOptionObjects(tempObjects);
    }

    const createLiveSettings = () => {
        var tempObjects = [];
        tempObjects.push(<option key={0} value="choose">Choose</option>);
        for(var value in liveSettings[activePage]){
            tempObjects.push(
                <option key={liveSettings[activePage][value]} value={liveSettings[activePage][value]}>{liveSettings[activePage][value]}</option>
            )
        }
        setLiveSettingsOptions(tempObjects);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        var today = new Date();
        var time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        var tempTask = {...taskInfo};
        tempTask.start = time;

        var id = (Math.random() + 1).toString(36).slice(2,10);
        props.updateTasks(tempTask, id, "liveFreight", "dryGoodsLive");
        // props.updateTasks({id: id, task: tempTask});

        closePopUp();
    };

    const closePopUp = () => {
        props.togglePopup(false);
    };

    return (
        <div className="newAislePopupContainer">

            <div className='background' onClick={closePopUp}></div>
            <form
            className='formContainer' 
            onSubmit={handleSubmit}>
                <h1 className='formTitle'>New Aisle</h1>
                <label>
                    Name:
                    <EmployeeSelect onSelect={handleChange} employees={props.employees}/>
                </label>

                <label>
                    Aisle Number:
                    <select className="aisleInput" name="aisle" onChange={handleChange}>
                        {liveSettingsOptions}
                    </select>
                </label>

                <label>
                    Box Count:
                    <input type="text"
                    name="boxes" 
                    value={taskInfo.boxes} 
                    onChange={handleChange} 
                    maxLength={3}/>
                </label>
                <label>
                    Tote Count:
                    <input type="text"
                    name="totes" 
                    value={taskInfo.totes} 
                    onChange={handleChange} 
                    maxLength={3}/>
                </label>
                <button type="submit" disabled={submitDisabled}>
                    <IoCheckmarkDoneSharp />
                </button>
                <button type='button' onClick={closePopUp}>
                    <IoCloseSharp />
                </button>
            </form>
        </div>
    )
}

export default NewAislePopup;