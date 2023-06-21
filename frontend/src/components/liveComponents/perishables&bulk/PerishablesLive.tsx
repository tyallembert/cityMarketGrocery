import React, { useState, useEffect } from 'react';
import "../../../styles/perishablesLive.scss";
import PerishablesVendor from './PerishablesVendor';
import { Employee, PerishablesLiveFreight, Tasks } from '../../../types';

type Props = {
    title: string,
    tasks: Tasks,
    employees: Employee[],
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}
const PerishablesLive: React.FC<Props> = (props) => {
    const [tasks, setTasks] = useState<Tasks>(props.tasks);

    const [waitingTasks, setWaitingTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [arrivedTasks, setArrivedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [startedTasks, setStartedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});
    const [finishedTasks, setFinishedTasks] = useState<{[key:string]: PerishablesLiveFreight}>({});

    // useEffect(() => {
    //     if(Object.keys(waitingTasks).length === 0){
    //         fetchTodaysVendors();
    //     }
    //     // setTodaysVendors();
    // }, [])

    // useEffect(() => {
    //     setTasks(props.tasks);
    // }, [arrivedTasks, startedTasks, finishedTasks])

    useEffect(() => {
        populateTasks();
        console.log("tasks")
    }, [tasks])

    const populateTasks = () => {
        let tempVendors = ["UNFI", "AG", "Monument Farms"];

        setWaitingTasks({});
        setArrivedTasks({});
        setStartedTasks({});
        setFinishedTasks({});

        if((Object.keys(waitingTasks).length + 
        Object.keys(arrivedTasks).length + 
        Object.keys(startedTasks).length +
        Object.keys(finishedTasks).length) === 0){

            tempVendors.forEach((value:string) => {
                var vendorStatus = "waiting";
                var isVendorSaved = false;
                var vendorKey = "";
                for(var key in tasks.liveFreight.perishablesLive){
                    var task = tasks.liveFreight.perishablesLive[key];
                    if(task.distributerName === value){
                        vendorStatus = task.status;
                        isVendorSaved = true;
                        vendorKey = key;
                        break;
                    }
                }
                if(vendorStatus === "waiting" && Object.values(waitingTasks).some((task:PerishablesLiveFreight) => task.distributerName === value) === false){
                    if(isVendorSaved === false){
                        vendorKey = (Math.random() + 1).toString(36).slice(2,10);
                    }
                    setWaitingTasks(prevTasks => {
                        return {...prevTasks, [vendorKey]: {
                            name: "",
                            distributerName: value,
                            arrival: "",
                            start: "",
                            end: "",
                            status: "waiting"
                        }}
                    })
                }
                else if(vendorStatus === "arrived"){
                    setArrivedTasks(prevTasks => {
                        return {...prevTasks, [vendorKey]: task}
                    })
                }
                else if(vendorStatus === "started"){
                    setStartedTasks(prevTasks => {
                        return {...prevTasks, [vendorKey]: task}
                    })
                }
                else if(vendorStatus === "finished"){
                    setFinishedTasks(prevTasks => {
                        return {...prevTasks, [vendorKey]: task}
                    })
                }
            })
        }
    }

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