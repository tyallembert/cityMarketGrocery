import React, { useState, useEffect, useCallback } from 'react';
import "../../../styles/perishablesLive.scss";
import PerishablesVendor from './PerishablesVendor';
import { Employee, PerishablesLiveFreight, Tasks } from '../../../types';

type Props = {
    title: string,
    tasks: Tasks,
    employees: {[key: string]: Employee},
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}
const PerishablesLive: React.FC<Props> = (props) => {
    const [tasks] = useState<Tasks>(props.tasks);

    const [waitingTasks, setWaitingTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [arrivedTasks, setArrivedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [startedTasks, setStartedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [finishedTasks, setFinishedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});

    const populateTasks = useCallback(() => {
        let tempVendors = ["UNFI", "AG", "Monument Farms"];

        const newWaitingTasks: {[key: string]: PerishablesLiveFreight} = {};
        const newArrivedTasks: {[key: string]: PerishablesLiveFreight} = {};
        const newStartedTasks: {[key: string]: PerishablesLiveFreight} = {};
        const newFinishedTasks: {[key: string]: PerishablesLiveFreight} = {};

        if((Object.keys(waitingTasks).length + 
        Object.keys(arrivedTasks).length + 
        Object.keys(startedTasks).length +
        Object.keys(finishedTasks).length) === 0){

            tempVendors.forEach((value: string) => {
                var vendorStatus = "waiting";
                var vendorKey = "";
                var task = {} as PerishablesLiveFreight;
                for(const key in tasks.liveFreight.perishablesLive){
                    if(tasks.liveFreight.perishablesLive[key].distributerName === value){
                        task = tasks.liveFreight.perishablesLive[key] as PerishablesLiveFreight;
                        vendorStatus = task.status;
                        vendorKey = key;
                        break;
                    }
                }
                if(vendorKey === ""){
                    vendorKey = (Math.random() + 1).toString(36).slice(2, 10);
                }
                if (vendorStatus === "waiting") {
                    newWaitingTasks[vendorKey] = {
                        name: "",
                        distributerName: value,
                        arrival: "",
                        start: "",
                        end: "",
                        status: "waiting"
                    };
                }
                else if (vendorStatus === "arrived") {
                    newArrivedTasks[vendorKey] = task;
                }
                else if (vendorStatus === "started") {
                    newStartedTasks[vendorKey] = task;
                }
                else if (vendorStatus === "finished") {
                    newFinishedTasks[vendorKey] = task;
                }
                setWaitingTasks(newWaitingTasks);
                setArrivedTasks(newArrivedTasks);
                setStartedTasks(newStartedTasks);
                setFinishedTasks(newFinishedTasks);
            })
        }
    },[tasks.liveFreight.perishablesLive, waitingTasks, arrivedTasks, startedTasks, finishedTasks])

    useEffect(() => {
        populateTasks();
    }, [populateTasks])

    const fetchTodaysVendors = () => {
        console.log("fetching vendors");
        // fetch("http://localhost:3000/api/v1/perishablesLive")
        // .then(res => res.json())
        // .then(data => {
        //     setWaitingTasks(data);
        // })
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
        props.updateTasks(task, id, "liveFreight", "perishablesLive");
    }

    return (
        <div className="perishablesLiveContainer">
            <div className='waitingContainer'>
                {
                    Object.keys(waitingTasks).length > 0 ? (
                        Object.keys(waitingTasks).map((key:string) => {
                            const value: PerishablesLiveFreight = waitingTasks[key];
                            return (
                                <PerishablesVendor key={key}
                                id={key}
                                vendorInfo={value}
                                employees={props.employees}
                                changeTaskStatus={changeTaskStatus}/>
                            )
                        })
                    ): (
                        <div className="noneWaitingContainer">
                            <h1>All vendors have arrived</h1>
                        </div>
                    )
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
                            employees={props.employees}
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
                            employees={props.employees}
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
                            employees={props.employees}
                            changeTaskStatus={changeTaskStatus}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PerishablesLive