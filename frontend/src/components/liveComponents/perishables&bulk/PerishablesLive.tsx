import React, { useState, useEffect } from 'react';
import "../../../styles/perishablesLive.scss";
import PerishablesVendor from './PerishablesVendor';
import { PerishablesLiveFreight } from '../../../types';

type Props = {
    title: string;
    tasks: {[key:string]: PerishablesLiveFreight};
}
const PerishablesLive: React.FC<Props> = (props) => {
    const [tasks, setTasks] = useState(props.tasks);

    const [waitingTasks, setWaitingTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [arrivedTasks, setArrivedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [startedTasks, setStartedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [finishedTasks, setFinishedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});

    useEffect(() => {
        setTodaysVendors();
    }, [])

    useEffect(() => {
        // setTasks(props.tasks);
    }, [arrivedTasks, startedTasks, finishedTasks])
    const setTodaysVendors = () => {
        let tempVendors = ["UNFI", "AG", "Monument Farms"];
        setWaitingTasks(() => {
            let newWaitingTasks:{[key:string]: PerishablesLiveFreight} = {};
            tempVendors.forEach((value:any) => {
                var id = (Math.random() + 1).toString(36).slice(2,10);
                newWaitingTasks[id] = {
                    name: "",
                    distributerName: value,
                    arrival: "",
                    start: "",
                    end: "",
                    status: "waiting"
                };
            })
            return newWaitingTasks;
        })
    }

    const changeTaskStatus = (task: PerishablesLiveFreight, id:string) => {

        switch(task.status){
            case "arrived":
                setArrivedTasks({...arrivedTasks, [id]: task});
                setWaitingTasks(prevTasks => {
                    const { [id]: removedTask, ...remainingTasks } = prevTasks;
                    return remainingTasks;
                });
                break;
            case "started":
                setStartedTasks({...startedTasks, [id]: task});
                setArrivedTasks(prevTasks => {
                    const { [id]: removedTask, ...remainingTasks } = prevTasks;
                    return remainingTasks;
                });
                break;
            case "finished":
                setFinishedTasks({...finishedTasks, [id]: task});
                setStartedTasks(prevTasks => {
                    const { [id]: removedTask, ...remainingTasks } = prevTasks;
                    return remainingTasks;
                });
                break;
        }
    }

    return (
        <div className="perishablesLiveContainer">
            <div className='waitingContainer'>
                {
                    Object.keys(waitingTasks).map((key:string) => {
                        const value: PerishablesLiveFreight = waitingTasks[key];
                        return (
                            <PerishablesVendor key={key}
                            id={key}
                            vendorInfo={value}
                            changeTaskStatus={changeTaskStatus}/>
                        )
                    })
                }
            </div>
            {
                Object.keys(arrivedTasks).length === 0 && 
                Object.keys(startedTasks).length === 0 &&
                Object.keys(finishedTasks).length === 0 ? (
                    <div className="noTasksContainer">
                        <h1>No vendors have arrived yet!</h1>
                    </div>
                ): null
            }
            <div className='arrivedContainer'>
                {
                    Object.keys(arrivedTasks).map((key:string) => {
                        const value: PerishablesLiveFreight = arrivedTasks[key];
                        return (
                            <PerishablesVendor key={key}
                            id={key}
                            vendorInfo={value}
                            changeTaskStatus={changeTaskStatus}/>
                        )
                    })
                }
            </div>
            <div className='startedContainer'>
                {
                    Object.keys(startedTasks).map((key:any) => {
                        const value: PerishablesLiveFreight = startedTasks[key];
                        return (
                            <PerishablesVendor key={key}
                            id={key}
                            vendorInfo={value}
                            changeTaskStatus={changeTaskStatus}/>
                        )
                    })
                }
            </div>
            <div className='finishedContainer'>
                {
                    Object.keys(finishedTasks).map((key:any) => {
                        const value: PerishablesLiveFreight = finishedTasks[key];
                        return (
                            <PerishablesVendor key={key}
                            id={key}
                            vendorInfo={value}
                            changeTaskStatus={changeTaskStatus}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PerishablesLive