import React, { useState, useEffect } from 'react';
import "../../../styles/perishablesVendor.scss";
import { Employee, PerishablesLiveFreight } from '../../../types';

type Props = {
    vendorInfo: PerishablesLiveFreight,
    employees: Employee[],
    id: string,
    changeTaskStatus: (task: PerishablesLiveFreight, id: string) => void
}
enum VendorStatus {
    WAITING = "waiting",
    ARRIVED = "arrived",
    STARTED = "started",
    FINISHED = "finished"
}
const PerishablesVendor: React.FC<Props> = (props) => {
    const [animationType, setAnimationType] = useState("animateIn");
    const [id, setId] = useState(props.id);
    const [vendorInfo, setVendorInfo] = useState<PerishablesLiveFreight>(props.vendorInfo);

    useEffect(() => {
        console.log(id)
        props.changeTaskStatus(vendorInfo, id);
    }, [vendorInfo.status])

    useEffect(() => {

    }, [animationType])

    const formatTime = (time: Date) => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours: 12;
        let minutesString = minutes < 10 ? ("0" + minutes).toString(): minutes.toString();
        let strTime = hours + ':' + minutesString + ' ' + ampm;
        return strTime;
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let newInfo = {...vendorInfo};
        newInfo.name = event.target.value;
        setVendorInfo(newInfo);
    }

    const changeVendorStatus = () => {
        setAnimationType("animateOut");
        setTimeout(() => {
            setVendorInfo((prevInfo) => {
                let newInfo = {...prevInfo};
                if (prevInfo.status === VendorStatus.WAITING) {
                    newInfo.status = VendorStatus.ARRIVED;
                    newInfo.arrival = formatTime(new Date());
                } else if (prevInfo.status === VendorStatus.ARRIVED) {
                    newInfo.status = VendorStatus.STARTED;
                    newInfo.start = formatTime(new Date());
                } else if (prevInfo.status === VendorStatus.STARTED) {
                    newInfo.status = VendorStatus.FINISHED;
                    newInfo.end = formatTime(new Date());
                }
                console.log(newInfo)
                return newInfo;
            })
        }, 500)
    }

    return (
        <div className={`vendorContainer ${vendorInfo.status} ${animationType}`} 
        onClick={vendorInfo.status === VendorStatus.WAITING ? changeVendorStatus: undefined}>
            <div className='vendorHeaderContainer'>
                <div className='statusIconContainer'>

                </div>
                <p className="vendorTitle">{props.vendorInfo.distributerName}</p>
            </div>
            {
                vendorInfo.status === VendorStatus.WAITING ?
                null
                :
                vendorInfo.status === VendorStatus.ARRIVED ?
                <div className="vendorStatusContainer">
                    <div className="timeContainer timeArrivedContainer">
                        <p>Arrived at:</p>
                        <p className='timeElement'>{vendorInfo.arrival}</p>
                    </div>
                    <p className='nameHeader'>Name:</p>
                    <div className='nameContainer'>
                        <select className="nameInput" name="name" onChange={handleChange}>
                            <option value="Select">Select</option>
                            {
                                Object.keys(props.employees).map((key: string) => {
                                    var employee = props.employees[key];
                                    return <option value={`${employee.firstName} ${employee.lastName[0]}`}>{`${employee.firstName} ${employee.lastName[0]}`}</option>
                                }
                                )
                            }
                        </select>
                        <button className="startButton" onClick={changeVendorStatus}>Start</button>
                    </div>
                </div>
                :
                vendorInfo.status === VendorStatus.STARTED ?
                <div className="vendorStatusContainer">
                    <div className="timeContainer timeArrivedContainer">
                        <p>Arrived at:</p>
                        <p className='timeElement'>{vendorInfo.arrival}</p>
                    </div>
                    <div className="timeContainer timeStartedContainer">
                        <p>Started at:</p>
                        <p className='timeElement'>{vendorInfo.start}</p>
                    </div>
                    <button className="startButton" onClick={changeVendorStatus}>Finish</button>
                </div>
                :
                <div className="vendorStatusContainer">
                    <div className="timeContainer timeArrivedContainer">
                        <p>Arrived at:</p>
                        <p className='timeElement'>{vendorInfo.arrival}</p>
                    </div>
                    <div className="timeContainer timeStartedContainer">
                        <p>Started at:</p>
                        <p className='timeElement'>{vendorInfo.start}</p>
                    </div>
                    <div className="timeContainer timeFinishedContainer">
                        <p>Finished at:</p>
                        <p className='timeElement'>{vendorInfo.end}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default PerishablesVendor