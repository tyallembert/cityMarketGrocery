import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";
import "../../../styles/newAislePopup.scss";
import EmployeeSelect from '../../EmployeeSelect';
import { Employee } from '../../../types';
type Props = {
    togglePopup: any,
    employees: {[key: string]: Employee},
    activePage: string,
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}
const NewAislePopup: React.FC<Props> = (props) => {

    const [showingPopUp, setShowingPopUp] = useState<boolean>(true);
    const [liveSettings, setLiveSettings] = useState<{[key: string]: any}>({});
    const [liveSettingsOptions, setLiveSettingsOptions] = useState<JSX.Element[]>([]);
    const [activePage, setActivePage] = useState(props.activePage);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [taskInfo, setTaskInfo] = useState({
        name: "Choose",
        aisle: "Choose",
        boxes: "0",
        totes: "0",
        start: "",
        end: "",
        status: "In Progress"
    });

    const createLiveSettings = useCallback(() => {
        var tempObjects = [];
        tempObjects.push(<option key={0} value="Choose">Choose</option>);
        for(var value in liveSettings){
            tempObjects.push(
                <option key={liveSettings[value]} value={liveSettings[value]}>{liveSettings[value]}</option>
            )
        }
        setLiveSettingsOptions(tempObjects);
    }, [liveSettings, activePage]);
    
    useEffect(() => {
        createLiveSettings();
    }, [createLiveSettings]);

    useEffect(() => {
        if(!showingPopUp) {
            setTimeout(() => {
                props.togglePopup(false);
            }, 300);
        }
    }
    , [showingPopUp, props]);

    useEffect(() => {
        checkSubmitDisabled();
    }, [taskInfo])

    const checkSubmitDisabled = () => {

        if(taskInfo.name !== "Choose" && taskInfo.aisle !== "Choose"){
            setSubmitDisabled(false);
        }else{
            setSubmitDisabled(true);
        }
    }

    useEffect(() => {
        setActivePage(props.activePage);
        fetchTaskSettings();
    }, [props.employees, props.activePage])

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setTaskInfo({ ...taskInfo,[event.target.name]: event.target.value});
    };

    const fetchTaskSettings = async() => {
        const data = await fetch('/getTaskSettings');
        const settings = await data.json();
        const liveSettings = settings.liveFreight.components.dryGoodsLive.options
        setLiveSettings(liveSettings);
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
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
        closePopUp();
    };

    const closePopUp = () => {
        setShowingPopUp(false);
    };

    return (
        <div className={showingPopUp ? 'newAislePopupContainer inAnimation': 'newAislePopupContainer outAnimation'}>

            <div className='background' onClick={closePopUp}></div>
            <form
            className={props.togglePopup ? 'formContainer inAnimation': 'formContainer outAnimation'}
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

                <label className='sliderContainer'>
                    Box Count: {taskInfo.boxes}
                    <input type="range" min="0" max="100" value={taskInfo.boxes} name="boxes" className="slider" onChange={handleChange} />
                </label>
                <label className='sliderContainer'>
                    Tote Count: {taskInfo.totes}
                    <input type="range" min="0" max="100" value={taskInfo.totes} name="totes" className="slider" onChange={handleChange} />
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