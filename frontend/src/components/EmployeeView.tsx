// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Header from "./header/header.tsx";
import LeftNav from "./leftNav.tsx";
import Main from "./main.tsx";
import { Employee, Tasks } from "../types.ts";

const EmployeeView = () => {

  // SEND THE PAGES VARIABLES OVER TO ALL PAGES THAT NEED IT

  const [activePage, setActivePage] = useState<string>("liveFreight");
  const [activePageParent, setActivePageParent] = useState<string>("");
  const [currentTasks, setCurrentTasks] = useState<Tasks>({} as Tasks);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
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
  // useEffect(() => {
  // }, [employees, currentTasks, taskSettings, activePage, activePageParent]);

  const checkIfEmail = () => {
    var date = new Date();
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
    const tasks: Tasks = await data.json();
    setCurrentTasks(tasks);
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
  const updateTask = async(res: any) => {
    var type = res.type;
    var data = res.task;
    var id: string = res.id;
    var tempTasks: Tasks = {...currentTasks};
    tempTasks[type][id] = {...data};
    setCurrentTasks(tempTasks);
    await saveData();
  }
  const saveData = async() => {
    await fetch("/saveData", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentTasks)
    });
  }

  // const updateCurrentTasks = async(res: any) => {
  //   var type = res.type;
  //   var data = res.task;
  //   var id: string = res.id;
  //   var tempTasks: Tasks = {...currentTasks};
  //   tempTasks[type][id] = {...data};
  //   setCurrentTasks(tempTasks);
  // }

  const updateActivePage = (res: any) => {
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
            <Header activePage={activePage} 
            activePageParent={activePageParent} 
            taskSettings={taskSettings}
            employees={employees}/>

            <div className="contentContainer">
              <LeftNav taskSettings={taskSettings} 
              updateActivePage={updateActivePage}/>

              <Main taskSettings={taskSettings} 
              activePage={activePage} 
              activePageParent={activePageParent} 
              tasks={currentTasks} 
              employees={employees}
              saveData={saveData}/>

            </div>
            <button onClick={checkIfEmail}>Send Email</button>
        </>
        ) : (<div>Error Fetching Data</div>)
      }
    </div>
  );
}

export default EmployeeView;
