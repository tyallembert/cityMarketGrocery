import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import BasicTemplate from './BasicTemplate';
import { FcCalendar } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import '../../../styles/calendar.scss';
import "../../../styles/adminOverview.scss";
import LeftNav from '../../leftNav';

function AdminOverview(props) {
    const [daysData, setDaysData] = useState([]);
    const [activeTask, setActiveTask] = useState("liveFreight");
    const [activeParent, setActiveParent] = useState("");
    const [daysDataObjects, setDaysDataObjects] = useState([]);
    const [date, setDate] = useState(new Date());
    const [calendarActive, setCalendarActive] = useState(false);
    const [taskSettings, setTaskSettings] = useState({});

    useEffect(() => {
        fetchTaskSettings();
    }, [])
    useEffect(() => {
        fetchDaysData();
    }, [date])
    
    useEffect(() => {
        createInfoObjects();
    }, [daysData, activeTask, taskSettings])

    const fetchTaskSettings = async() => {
        const data = await fetch('/getTaskSettings')
        const settings = await data.json();
        setTaskSettings(settings);
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
        console.log(tasks)
        setDaysData(tasks[0]);
    }
    const createInfoObjects = () => {
        var tempObjects = []
        console.log("ACTIVE TASK: ", activeTask)
        if(activeParent === ""){
            for(var taskType in daysData[activeTask]){
                for(var taskKey in daysData[activeTask][taskType]){
                    var oneTask = daysData[activeTask][taskType][taskKey];
                    console.log("Pushing one entry")
                    tempObjects.push(
                        <BasicTemplate key={taskKey} isAll={true} activeTask={taskType} task={oneTask}/>
                    )
                }
            }
        }else{
            try{
                for(var taskKey in daysData[activeParent][activeTask]){
                    var oneTask = daysData[activeParent][activeTask][taskKey];
                    tempObjects.push(
                        <BasicTemplate key={taskKey} activeTask={activeTask} task={oneTask}/>
                    )
                }
            }catch(e){
                console.log(e)
            }
        }
        if(tempObjects.length === 0){
            tempObjects.push(
                <div key={"error"} className='emptyMessage'>
                    <p>No Data</p>
                </div>
            )
        }
        setDaysDataObjects(tempObjects);
    }
    const updateActiveTask = (res) => {
        var page = res.activePage;
        var parent = res.parent;
        setActiveTask(page);
        setActiveParent(parent);
    }
    const toggleCalendarActive = () => {
        calendarActive ? setCalendarActive(false): setCalendarActive(true);
    }

    return (
        <div className="adminOverviewContainer">
            <LeftNav taskSettings={taskSettings} updateActivePage={updateActiveTask}/>
            <div className='calendarInfoContainer'>
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
                            <div className='titleWhenClosed'>
                                <h1>{date.toLocaleString('default', { month: 'long' })}  {date.getDate()}, {date.getFullYear()}</h1>
                            </div>
                        )
                    }
                </div>
                <div>
                    {/* <h1>
                    {activeTask ? taskSettings[activeTask].title : null}
                    {activeTask && activeParent ? taskSettings[activeParent][activeTask].title : null}
                    </h1> */}
                </div>
                <div className='infoContainer'>
                    <div className='activeTitle'>
                        {/* <p>{activeTask ? taskSettings[activeTask].title : null}</p> */}
                    </div>
                    <div className={'dataContainer ' + activeTask}>
                        <div className='title elementContainer'>
                            <div className='singleElement'>
                                Name
                            </div>
                            <div className='singleElement'>
                                Aisle
                            </div>
                            <div className='singleElement'>
                                # Boxes
                            </div>
                            <div className='singleElement'>
                                Start Time
                            </div>
                            <div className='singleElement'>
                                End Time
                            </div>
                        </div>
                        {daysDataObjects}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOverview;