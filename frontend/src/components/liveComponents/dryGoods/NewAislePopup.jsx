import { useState, useEffect } from 'react';
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";
import "./newAislePopup.scss";
import {motion} from 'framer-motion';
import {animation__newAisleContainer, animation__newAisleChild} from "../../animations";

function NewAislePopup(props) {

    const [employees, setEmployees] = useState(props.employees);
    const [employeeOptionObjects, setEmployeeOptionObjects] = useState([]);
    const [liveSettings, setLiveSettings] = useState([]);
    const [liveSettingsOptions, setLiveSettingsOptions] = useState([]);
    const [activePage, setActivePage] = useState(props.activePage);
    const [taskInfo, setTaskInfo] = useState({
        name: "",
        aisle: "",
        boxes: "",
        start: "",
        end: "",
        status: "In Progress"
    });
    useEffect(() => {
        setEmployees(props.employees);
        setActivePage(props.activePage);
        fetchLiveSettings()
    }, [])
    useEffect(() => {
        createEmployeeOptions();
    }, [employees])
    useEffect(() => {
        createLiveSettings();
    }, [liveSettings])
    const handleChange = (event) => {
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
        props.updateTasks({id: id, task: tempTask});

        closePopUp();
    };
    const closePopUp = () => {
        props.togglePopup(false);
    };

    return (
        <div className="newAislePopupContainer">

            <div className='background' onClick={closePopUp}></div>
            <motion.form
            variants={animation__newAisleContainer}
            initial="hidden"
            animate="visible"
            className='formContainer' onSubmit={handleSubmit}>
                <h1 className='formTitle'>New Aisle</h1>
                <motion.label variants={animation__newAisleChild}>
                    Name:
                    <select className="nameInput" name="name" onChange={handleChange}>
                        {employeeOptionObjects}
                    </select>
                </motion.label>

                <motion.label variants={animation__newAisleChild}>
                    Aisle Number:
                    <select className="aisleInput" name="aisle" onChange={handleChange}>
                        {liveSettingsOptions}
                    </select>
                </motion.label>

                <motion.label variants={animation__newAisleChild}>
                    Box Count:
                    <input type="text"
                    name="boxes" 
                    value={taskInfo.boxes} 
                    onChange={handleChange} 
                    maxLength={3}/>
                </motion.label>
                <motion.button variants={animation__newAisleChild} type="submit">
                    <IoCheckmarkDoneSharp />
                </motion.button>
                <motion.button variants={animation__newAisleChild} type='button' onClick={closePopUp}>
                    <IoCloseSharp />
                </motion.button>
            </motion.form>
        </div>
    )
}

export default NewAislePopup;