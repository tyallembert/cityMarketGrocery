import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import BasicTemplate from './BasicTemplate';
import { FcCalendar } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import '../calendar.scss';
import "./adminOverview.scss";

function AdminOverview(props) {
    const [daysData, setDaysData] = useState([]);
    const [activeTask, setActiveTask] = useState("");
    const [daysDataObjects, setDaysDataObjects] = useState([]);
    const [date, setDate] = useState(new Date());
    const [calendarActive, setCalendarActive] = useState(false);

    const [navSettings, setNavSettings] = useState({});

    useEffect(() => {
        setNavSettings(props.navSettings);
        setActiveTask()
    }, [props.navSettings])

    useEffect(() => {
        fetchDaysData();
    }, [date])
    
    useEffect(() => {
        createInfoObjects();
    }, [daysData, activeTask])

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
        setDaysData(tasks);
    }
    const createInfoObjects = () => {
        var tempObjects = []
        for(var x in daysData){
            if(activeTask === "all"){
                for(var taskType in daysData[x][0]){
                    for(var y in daysData[x][0][taskType]){
                        var oneTask = daysData[x][0][taskType][y];
                        tempObjects.push(
                            <BasicTemplate key={y} isAll={true} activeTask={taskType} task={oneTask}/>
                        )
                    }
                }
            }else{
                for(var y in daysData[x][0][activeTask]){
                    var oneTask = daysData[x][0][activeTask][y];
                    tempObjects.push(
                        <BasicTemplate key={y} activeTask={activeTask} task={oneTask}/>
                    )
                }
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
    const updateActiveTask = (e) => {
        var name = e.currentTarget.className.split(" ")[0];
        var tempNavClasses = {...navSettings};
        for(var element in tempNavClasses){
            var stringArray = tempNavClasses[element].classes.split(" ");
            if(stringArray.includes(name)){
                tempNavClasses[element].classes = stringArray[0] + " " + stringArray[1] + " activeNav";
            }
            else if(stringArray.includes("activeNav")){
                tempNavClasses[element].classes = stringArray[0] + " " + stringArray[1];
            }
        }
        setNavSettings(tempNavClasses);
        setActiveTask(name);
    }
    const toggleCalendarActive = () => {
        calendarActive ? setCalendarActive(false): setCalendarActive(true);
    }

    return (
        <div className="adminOverviewContainer">
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
                    />) : null
                }
            </div>
            <div className='infoContainer'>
                <div className='taskTypeNavContainer'>
                    {Object.keys(navSettings).map((value, index) => {
                        return (
                            <div className={navSettings[value].classes} key={index} onClick={updateActiveTask}>
                                <p>{navSettings[value].title}</p>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='activeTitle'>
                    <p>{activeTask ? navSettings[activeTask].title : null}</p>
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
    )
}

export default AdminOverview;