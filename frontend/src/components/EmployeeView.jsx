// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Header from "./header/header";
import LeftNav from "./leftNav";
import Main from "./main";

function EmployeeView() {

  // SEND THE PAGES VARIABLES OVER TO ALL PAGES THAT NEED IT

  const [activePage, setActivePage] = useState("liveFreight");
  const [activePageParent, setActivePageParent] = useState("");
  const [currentTasks, setCurrentTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [taskSettings, setTaskSettings] = useState({});

  //Check if its time to send email
  useEffect(() => {
    // setInterval(checkIfEmail, 3000);
  }, []);

  useEffect(() => {
    fetchTaskSettings();
    fetchEmployees();
    fetchCurrentTasks();
  }, []);
  useEffect(() => {
    // console.log("RELOAD: ")
    // console.log(activePageParent)
    // console.log(activePage)
  }, [currentTasks, taskSettings, activePage, activePageParent]);

  const checkIfEmail = () => {
    var date = new Date();
    console.log("HOURS: "+date.getHours())
    console.log("MINUTES: "+date.getMinutes())
    var send = true;
    // if (date.getHours() === 17 && date.getMinutes() === 32) {
    if (send) {
      fetch("/sendEmail", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentTasks)
      });
    }
  }
  const fetchCurrentTasks = async() => {
    const data = await fetch('/currentTasks');
    const tasks = await data.json();
    console.log(tasks)
    setCurrentTasks(tasks);
    console.log("got to here")
    setDataFetched(true);
  }
  const fetchEmployees = async() => {
    const data = await fetch('/getCurrentEmployees');
    const tempEmployees = await data.json();
    setEmployees(tempEmployees);
  }
  const fetchTaskSettings = async() => {
    const data = await fetch('/getTaskSettings');
    const settings = await data.json();
    setTaskSettings(settings);
  }

  const updateCurrentTasks = async(res) => {
    var type = res.type;
    var data = res.task;
    var id = res.id;
    var tempTasks = {...currentTasks};
    tempTasks[type][id] = await {...data};
    setCurrentTasks(tempTasks);
  }

  const updateActivePage = (res) => {
    var page = res.activePage;
    var parent = res.parent;
    setActivePageParent(parent);
    setActivePage(page);
  }

  return (
    <div className="EmployeeView">
      {
        dataFetched ? 
        (
        <>
            <Header activePage={activePage} activePageParent={activePageParent} taskSettings={taskSettings} updateCurrentTasks={updateCurrentTasks}/>
            <div className="contentContainer">
              <LeftNav taskSettings={taskSettings} updateActivePage={updateActivePage}/>
              <Main taskSettings={taskSettings} activePage={activePage} activePageParent={activePageParent} tasks={currentTasks} employees={employees}/>
            </div>
            <button onClick={checkIfEmail}>Send Email</button>
        </>
        ) : (<div>Error Fetching Data</div>)
      }
    </div>
  );
}

export default EmployeeView;
