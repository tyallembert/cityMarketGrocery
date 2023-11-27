import React, { useState, useEffect, ChangeEvent } from 'react';
import "../../../styles/gridRow.scss";
import { IoCheckmarkDoneSharp, IoPause } from "react-icons/io5";
import { Employee } from '../../../types';
import EmployeeSelect from '../../EmployeeSelect';

type Props = {
    aisle: any,
    id: any,
    employees: {[key:string]: Employee},
    updateTasks: any
}

const GridRow: React.FC<Props> = (props) => {
    const [currentAisle, setCurrentAisle] = useState(props.aisle);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [id, setId] = useState(props.id);
    const [resumeName, setResumeName] = useState("");

    useEffect(() => {
        setId(props.id)
        setDataLoaded(true)
    }, [props.id]);

    const handleSelectChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setResumeName(event.target.value);
    }
    const handlePause = async() => {
        var tempAisle = {...currentAisle};
        tempAisle.status = "Paused";
        setCurrentAisle(tempAisle);
        props.updateTasks(tempAisle, id, "liveFreight", "dryGoodsLive");
    }
    const handleResume = async() => {
        var tempAisle = {...currentAisle};
        tempAisle.status = "Confirm Resume";        
        setCurrentAisle(tempAisle);
    }
    const handleResumeConfirm = async() => {
        var tempAisle = {...currentAisle};
        tempAisle.name = `${tempAisle.name}, ${resumeName}`;
        tempAisle.status = "In Progress";        
        setCurrentAisle(tempAisle);
        props.updateTasks(tempAisle, id, "liveFreight", "dryGoodsLive");
    }
    const handleResumeCancel = async() => {
        var tempAisle = {...currentAisle};
        tempAisle.status = "Paused";        
        setCurrentAisle(tempAisle);
    }
    const handleFinish = async() => {
        var tempAisle = {...currentAisle}
        var today = new Date();
        var time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        tempAisle.end = time;
        tempAisle.status = "Finished";
        setCurrentAisle(tempAisle);

        props.updateTasks(tempAisle, id, "liveFreight", "dryGoodsLive");
    };

    return (
        <>
            {
            dataLoaded ? (
                <div className="gridRowContainer">
                    <div className="rowElement name">
                        <p>{currentAisle.name}</p>
                        {
                            currentAisle.status === "Confirm Resume" ? (
                                <div className="resumePopup">
                                    <EmployeeSelect onSelect={handleSelectChange} employees={props.employees}/>
                                    <button onClick={handleResumeConfirm}>Confirm</button>
                                    <button onClick={handleResumeCancel}>Cancel</button>
                                </div>
                            ): null
                        }
                        {
                            currentAisle.status === "Paused" ? (
                                <button onClick={handleResume} className='resumeButton'>
                                    Resume
                                </button>
                            ): null
                        }
                    </div>
                    <div className="rowElement aisle">
                        <p>{currentAisle.aisle}</p>
                    </div>
                    <div className="rowElement box">
                        <p>{currentAisle.boxes}</p>
                    </div>
                    <div className="rowElement tote">
                        <p>{currentAisle.totes}</p>
                    </div>
                    <div className="rowElement start">
                        <p>{currentAisle.start}</p>
                    </div>
                    <div className="rowElement end">
                        {
                        currentAisle.end === "" && (currentAisle.status !== "Paused" && currentAisle.status !== "Confirm Resume") ? (
                            <>
                                <button onClick={handleFinish} className='endButton'>
                                    <IoCheckmarkDoneSharp />
                                </button>
                                <button onClick={handlePause} className='pauseButton'>
                                    <IoPause />
                                </button>
                            </>
                        ) : (currentAisle.end)
                        }
                    </div>
                    <div className="rowElement status">
                        <p className={currentAisle.status}>{currentAisle.status}</p>
                    </div>
                </div>
            )
                    : (null)
            }
            
        </>
    )
}

export default GridRow;