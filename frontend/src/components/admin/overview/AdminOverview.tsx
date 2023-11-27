import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import BasicTemplate from './LiveRowTemplate';
import { FcCalendar } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import '../../../styles/calendar.scss';
import "../../../styles/adminOverview.scss";
import LeftNav from '../../leftNav';
import { DryGoods, DryGoodsLive, DryGoodsTask, LiveFreight, Tasks } from '../../../types';
import PerishablesLive from '../../liveComponents/perishables&bulk/PerishablesLive';
import GridTable from '../../liveComponents/dryGoods/GridTable';
import LiveRowTemplate from './LiveRowTemplate';

type Props = {
    tasks: any,
    employees: any,
    updateTasks: any
}

const AdminOverview: React.FC<Props> = (props) => {

    // CALENDAR variables
    const [date, setDate] = useState(new Date());
    const [calendarActive, setCalendarActive] = useState(false);
    // OVERVIEW variables
    const [daysData, setDaysData] = useState<Tasks>({} as Tasks);
    const [liveTotalBoxes, setLiveTotalBoxes] = useState<Number>(0);
    const [liveTotalTotes, setLiveTotalTotes] = useState<Number>(0);
    const [livePerishablesVendor, setLivePerishablesVendor] = useState<string[]>([]);
    const [upstockAll, setUpstockAll] = useState<string[]>([]);
    const [backstockAll, setBackstockAll] = useState<string[]>([]);
    const [sectorsAll, setSectorsAll] = useState<string[]>([]);
    const [roundingAll, setRoundingAll] = useState<string[]>([]);
    const [periCastorsAll, setPeriCastorsAll] = useState<string[]>([]);
    const [periBackstockAll, setPeriBackstockAll] = useState<string[]>([]);


    useEffect(() => {
        countTotalsLive();
        loadPerishablesVendors();
        countTotalsDrygoods();
        countTotalsPeri();
    }, [daysData])

    useEffect(() => {
        fetchDaysData();
    }, [date])

    const toggleCalendarActive = () => {
        setCalendarActive(!calendarActive);
    }
    
    const fetchDaysData = async() => {
        var formattedStart = date.toLocaleDateString('en-us');
        const data = await fetch("/daysData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({start: formattedStart, end: formattedStart})
        });
        const tasks = await data.json();
        setDaysData(tasks[0]);
    }
    const countTotalsLive = () => {
        var totalBoxes = 0;
        var totalTotes = 0;
        
        if(daysData.liveFreight !== undefined){
            const dryGoodsLiveItems: { [key: string]: DryGoodsLive } = daysData.liveFreight.dryGoodsLive;
            for(var singleTask in dryGoodsLiveItems){
                totalBoxes += Number(dryGoodsLiveItems[singleTask].boxes);
                totalTotes += Number(dryGoodsLiveItems[singleTask].totes);
            }
        }
        setLiveTotalBoxes(totalBoxes);
        setLiveTotalTotes(totalTotes);
    }
    const loadPerishablesVendors = () => {
        var tempArray: string[] = [];
        if(daysData.liveFreight !== undefined){
            const liveFreight: LiveFreight = daysData.liveFreight;
            if(liveFreight.perishablesLive !== undefined){
                for(var vendor in liveFreight.perishablesLive){
                    if(liveFreight.perishablesLive[vendor].status !== "waiting")
                    tempArray.push(liveFreight.perishablesLive[vendor].distributerName);
                }
            }
        }
        setLivePerishablesVendor(tempArray);
    }
    const countTotalsDrygoods = () => {
        var upstock: string[] = [];
        var backstock: string[] = [];
        var sectors: string[] = [];
        var rounding: string[] = [];

        if(daysData.dryGoods !== undefined){
            if(daysData.dryGoods.upstock !== undefined){
                for(var singleTask in daysData.dryGoods.upstock){
                    upstock.push(daysData.dryGoods.upstock[singleTask].aisle);
                }
            }
            if(daysData.dryGoods.backstock !== undefined){
                for(var singleTask in daysData.dryGoods.backstock){
                    backstock.push(daysData.dryGoods.backstock[singleTask].aisle);
                }
            }
            if(daysData.dryGoods.sectors !== undefined){
                for(var singleTask in daysData.dryGoods.sectors){
                    sectors.push(daysData.dryGoods.sectors[singleTask].aisle);
                }
            }
            if(daysData.dryGoods.rounding !== undefined){
                for(var singleTask in daysData.dryGoods.rounding){
                    rounding.push(daysData.dryGoods.rounding[singleTask].aisle);
                }
            }
        }
        setUpstockAll(upstock);
        setBackstockAll(backstock);
        setSectorsAll(sectors);
        setRoundingAll(rounding);
    }
    const countTotalsPeri = () => {
        var castors: string[] = [];
        var backstock: string[] = [];

        if(daysData.perishables !== undefined){
            if(daysData.perishables.castors !== undefined){
                for(var singleTask in daysData.perishables.castors){
                    castors.push(daysData.perishables.castors[singleTask].aisle);
                }
            }
            if(daysData.perishables.backstock !== undefined){
                for(var singleTask in daysData.perishables.backstock){
                    backstock.push(daysData.perishables.backstock[singleTask].aisle);
                }
            }
        }
        setPeriCastorsAll(castors);
        setPeriBackstockAll(backstock);
    }
    // Components
    const calendarComponent = (
        <div className='calendarContainer'>
            <button className='hideOpenCalendar' onClick={toggleCalendarActive}>
                {calendarActive ? <GrFormClose />:<FcCalendar />}
            </button>
            {
                calendarActive ? (
                <Calendar className="calendarObject" onChange={setDate} 
                value={date} 
                minDetail={"year"}
                maxDate={new Date()}
                />) : (
                    <div className='titleWhenClosed' onClick={toggleCalendarActive}>
                        <h1>Overview {date.toLocaleString('default', { month: 'long' })}  {date.getDate()}, {date.getFullYear()}</h1>
                    </div>
                )
            }
        </div>
    )
    const overviewComponent = (
            <div className='overviewContainer'>
                <div className='liveFreightOverview'>
                    <h2 className='title'>Live Freight</h2>
                    <div className='inner totalBoxes'>
                        <h3>Total Boxes</h3>
                        <p>{`${liveTotalBoxes}`}</p>
                    </div>
                    <div className='inner totalTotes'>
                        <h3>Total Totes</h3>
                        <p>{`${liveTotalTotes}`}</p>
                    </div>
                    <div className='inner periVendors'>
                        <h3>Peri Vendors</h3>
                        <div className='typeContainer'>
                            {
                                livePerishablesVendor.map((vendor, index) => {
                                    return(
                                        <p key={index}>{vendor}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='inner bulkVendors'>
                        <h3>Bulk Vendors</h3>
                        <div className='typeContainer'>
                            {
                                livePerishablesVendor.map((vendor, index) => {
                                    return(
                                        <p key={index}>{vendor}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='dryGoodsOverview'>
                    <h2 className='title'>Dry Goods</h2>
                    <div className='inner upstock'>
                        <h3>Upstock</h3>
                        <p className='typeContainer'>
                        {
                            upstockAll.map((task, index) => {
                                return(
                                    <span key={index}>{task}{index === upstockAll.length-1 ? null: ","}</span>
                                )
                            })
                        }
                        </p>
                    </div>
                    <div className='inner backstock'>
                        <h3>Backstock</h3>
                        <p className='typeContainer'>
                        {
                            backstockAll.map((task, index) => {
                                return(
                                    <span key={index}>{task}{index === backstockAll.length-1 ? null: ","}</span>
                                )
                            })
                        }
                        </p>
                    </div>
                    <div className='inner sectors'>
                        <h3>Sectors</h3>
                        <div className='typeContainer'>
                            {
                                sectorsAll.map((task, index) => {
                                    return(
                                        <p key={index}>{task}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='inner rounding'>
                        <h3>Rounding</h3>
                        <div className='typeContainer'>
                            {
                                roundingAll.map((task, index) => {
                                    return(
                                        <p key={index}>{task}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='perishablesOverview'>
                    <h2 className='title'>Perishables</h2>
                    <div className='inner castors'>
                        <h3>Castors</h3>
                        <div className='typeContainer'>
                            {
                                periCastorsAll.map((task, index) => {
                                    return(
                                        <p key={index}>{task}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='inner backstock'>
                        <h3>Backstock</h3>
                        <div className='typeContainer'>
                            {
                                periBackstockAll.map((task, index) => {
                                    return(
                                        <p key={index}>{task}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
    const dryGoodsLiveComponent = (
            <div className='liveFreightContainer'>
                <div className='headerRow elementContainer'>
                    <div className='headerElement'>
                        Name
                    </div>
                    <div className='headerElement'>
                        Aisle
                    </div>
                    <div className='headerElement'>
                        # Boxes
                    </div>
                    <div className='headerElement'>
                        # Totes
                    </div>
                    <div className='headerElement'>
                        Start Time
                    </div>
                    <div className='headerElement'>
                        End Time
                    </div>
                </div>
                {
                    daysData.liveFreight !== undefined ? (
                        Object.entries(daysData.liveFreight.dryGoodsLive).map((task: Array<any>) => {
                            return (
                                <LiveRowTemplate key={task[0]} type={"dryGoodsLive"} task={task[1]}/>
                            )
                        })
                    ): null
                }
            </div>
    )
    const periLiveComponent = (
        <div className='periLiveContainer'>
            <div className='headerRow elementContainer'>
                    <p className='headerElement'>
                        Vendor
                    </p>
                    <p className='headerElement'>
                        Arrival Time
                    </p>
                    <p className='headerElement'>
                        Finish Time
                    </p>
                </div>
                {
                    daysData.liveFreight !== undefined ? (
                        Object.entries(daysData.liveFreight.perishablesLive).map((task: Array<any>) => {
                            if(task[1].status !== "waiting") {
                                return (
                                    <LiveRowTemplate key={task[0]} type={"perishablesLive"} task={task[1]}/>
                                )
                            }
                            return null;
                        })
                    ): null
                }
        </div>
    )
    const bulkLiveComponent = (
        <div className='bulkLiveContainer'>
            <div className='headerRow elementContainer'>
                    <p className='headerElement'>
                        Vendor
                    </p>
                    <p className='headerElement'>
                        Arrival Time
                    </p>
                    <p className='headerElement'>
                        Finish Time
                    </p>
                </div>
                {
                    daysData.liveFreight !== undefined ? (
                        Object.entries(daysData.liveFreight.perishablesLive).map((task: Array<any>) => {
                            if(task[1].status !== "waiting") {
                                return (
                                    <LiveRowTemplate key={task[0]} type={"perishablesLive"} task={task[1]}/>
                                )
                            }
                            return null;
                        })
                    ): null
                }
        </div>
    )
    const upstockComponent = (
        <div className='upstockContainer'>
            <div className='headerRow elementContainer'>
                    <p className='headerElement'>
                        Name
                    </p>
                    <p className='headerElement'>
                        Aisle
                    </p>
                    <p className='headerElement'>
                        Start Time
                    </p>
                    <p className='headerElement'>
                        End Time
                    </p>
                </div>
                {
                    daysData.dryGoods !== undefined ? (
                        Object.entries(daysData.dryGoods.upstock).map((task: Array<any>) => {
                            if(task[1].status !== "waiting") {
                                return (
                                    <LiveRowTemplate key={task[0]} type={"upstock"} task={task[1]}/>
                                )
                            }
                            return null;
                        })
                    ): null
                }
        </div>
    )
    return (
        <div className='adminOverviewContainer'>
            {calendarComponent}
            {overviewComponent}
            <h1 className='title'>Dry Goods Live</h1>
            {dryGoodsLiveComponent}
            <div className='periBulkContainer'>
                <div className='left'>
                    <h1 className='title'>Perishables Live</h1>
                    {periLiveComponent}
                </div>
                <div className='right'>
                    <h1 className='title'>Bulk Live</h1>
                    {bulkLiveComponent}
                </div>
            </div>
            <div className='upstockBackstockContainer'>
                <div className='left'>
                    <h1 className='title'>Upstock</h1>
                    {upstockComponent}
                </div>
                <div className='right'>
                    <h1 className='title'>Backstock</h1>
                    {bulkLiveComponent}
                </div>
            </div>
        </div>
    )
}
// const AdminOverview: React.FC<Props> = (props) => {
//     const [daysData, setDaysData] = useState([]);
//     const [activeTask, setActiveTask] = useState("liveFreight");
//     const [activeParent, setActiveParent] = useState("");
//     const [daysDataObjects, setDaysDataObjects] = useState([]);
//     const [date, setDate] = useState(new Date());
//     const [calendarActive, setCalendarActive] = useState(false);
//     const [taskSettings, setTaskSettings] = useState({});

//     useEffect(() => {
//         fetchTaskSettings();
//     }, [])
//     useEffect(() => {
//         fetchDaysData();
//     }, [date])
    
//     useEffect(() => {
//         createInfoObjects();
//     }, [daysData, activeTask, taskSettings])

//     const fetchTaskSettings = async() => {
//         const data = await fetch('/getTaskSettings')
//         const settings = await data.json();
//         setTaskSettings(settings);
//     }
//     const fetchDaysData = async() => {
//         var formattedStart = date.toLocaleDateString('en-us');
//         const data = await fetch("/daysData", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({start: formattedStart, end: formattedStart})
//         });
//         const tasks = await data.json();
//         console.log(tasks)
//         setDaysData(tasks[0]);
//     }
//     const createInfoObjects = () => {
//         var tempObjects = []
//         console.log("ACTIVE TASK: ", activeTask)
//         if(activeParent === ""){
//             for(var taskType in daysData[activeTask]){
//                 for(var taskKey in daysData[activeTask][taskType]){
//                     var oneTask = daysData[activeTask][taskType][taskKey];
//                     console.log("Pushing one entry")
//                     tempObjects.push(
//                         <BasicTemplate key={taskKey} isAll={true} activeTask={taskType} task={oneTask}/>
//                     )
//                 }
//             }
//         }else{
//             try{
//                 for(var taskKey in daysData[activeParent][activeTask]){
//                     var oneTask = daysData[activeParent][activeTask][taskKey];
//                     tempObjects.push(
//                         <BasicTemplate key={taskKey} activeTask={activeTask} task={oneTask}/>
//                     )
//                 }
//             }catch(e){
//                 console.log(e)
//             }
//         }
//         if(tempObjects.length === 0){
//             tempObjects.push(
//                 <div key={"error"} className='emptyMessage'>
//                     <p>No Data</p>
//                 </div>
//             )
//         }
//         setDaysDataObjects(tempObjects);
//     }
//     const updateActiveTask = (res) => {
//         var page = res.activePage;
//         var parent = res.parent;
//         setActiveTask(page);
//         setActiveParent(parent);
//     }
//     const toggleCalendarActive = () => {
//         calendarActive ? setCalendarActive(false): setCalendarActive(true);
//     }

//     return (
//         <div className="adminOverviewContainer">
//             <LeftNav taskSettings={taskSettings} updateActivePage={updateActiveTask}/>
//             <div className='calendarInfoContainer'>
//                 <div className='calendarContainer'>
//                     <button className='hideOpenCalendar' onClick={toggleCalendarActive}>
//                         {calendarActive ? <GrFormClose />:<FcCalendar />}
//                     </button>
//                     {
//                         calendarActive ? (
//                         <Calendar className="calendarObject" onChange={setDate} 
//                         value={date} 
//                         minDetail={"year"}
//                         maxDate={new Date()}
//                         />) : (
//                             <div className='titleWhenClosed'>
//                                 <h1>{date.toLocaleString('default', { month: 'long' })}  {date.getDate()}, {date.getFullYear()}</h1>
//                             </div>
//                         )
//                     }
//                 </div>
//                 <div>
//                     {/* <h1>
//                     {activeTask ? taskSettings[activeTask].title : null}
//                     {activeTask && activeParent ? taskSettings[activeParent][activeTask].title : null}
//                     </h1> */}
//                 </div>
//                 <div className='infoContainer'>
//                     <div className='activeTitle'>
//                         {/* <p>{activeTask ? taskSettings[activeTask].title : null}</p> */}
//                     </div>
//                     <div className={'dataContainer ' + activeTask}>
//                         <div className='title elementContainer'>
//                             <div className='singleElement'>
//                                 Name
//                             </div>
//                             <div className='singleElement'>
//                                 Aisle
//                             </div>
//                             <div className='singleElement'>
//                                 # Boxes
//                             </div>
//                             <div className='singleElement'>
//                                 Start Time
//                             </div>
//                             <div className='singleElement'>
//                                 End Time
//                             </div>
//                         </div>
//                         {daysDataObjects}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default AdminOverview;