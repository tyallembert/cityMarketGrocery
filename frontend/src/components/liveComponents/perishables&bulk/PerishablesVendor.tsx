import React, { useState, useEffect } from 'react';
import "../../../styles/perishablesVendor.scss";
import { PerishablesLiveFreight } from '../../../types';

type Props = {
    vendorInfo: PerishablesLiveFreight,
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
        props.changeTaskStatus(vendorInfo, id);
    }, [vendorInfo])

    useEffect(() => {
        
    }, [animationType])

    const formatTime = (time: Date) => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours: 12;
        minutes = minutes < 10 ? 0 + minutes: minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
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
        <div className={`vendorContainer ${vendorInfo.status} ${animationType}`} onClick={changeVendorStatus}>
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
                    <button className="startButton">Start</button>
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
                    <button className="startButton">Finish</button>
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