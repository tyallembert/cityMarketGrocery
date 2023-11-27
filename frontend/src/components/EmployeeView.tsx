// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import React, { useState, useEffect, useCallback } from "react";
import Header from "./header/header.tsx";
import LeftNav from "./leftNav.tsx";
import Main from "./main.tsx";
// import IMAGE from "../images/onions3.png";
import { Employee, Tasks } from "../types.ts";
// import ToDo from "./toDo/ToDo.tsx";

const EmployeeView = () => {

  const [activePage, setActivePage] = useState<string>("");
  const [activePageParent, setActivePageParent] = useState<string>("liveFreight");
  const [currentTasks, setCurrentTasks] = useState<Tasks>({} as Tasks);
  const [employees, setEmployees] = useState<{[key: string]: Employee}>({});
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

  const saveData = useCallback(async() => {
    await fetch("/saveData", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentTasks)
    });
  }, [currentTasks])

  useEffect(() => {
    if(Object.keys(currentTasks).length > 0){
      saveData();
    }
  }, [saveData, currentTasks])


  // const checkIfEmail = () => {
  //   // var date = new Date();
  //   var send = true;
  //   // if (date.getHours() === 17 && date.getMinutes() === 32) {
  //   if (send) {
  //     fetch("/sendEmail", {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(currentTasks)
  //     });
  //   }
  // }
  
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

  const updateTasks = async(task: any, id: string, type: string, subType: string) => {
    console.log(type)
    console.log(subType)
    setCurrentTasks((prevTasks) => ({
      ...prevTasks,
      [type as keyof Tasks]: {
        ...prevTasks[type as keyof Tasks],
        [subType]: {
          ...prevTasks[type as keyof typeof prevTasks][subType],
          [id]: {
            ...task,
          },
        },
      },
    }));
    saveData();
  }

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
              updateTasks={updateTasks}/>

              {/* <ToDo tasks={currentTasks}
              taskSettings={taskSettings}
              updateTasks={updateTasks}
              employees={employees}
              activePage={activePage}
              activePageParent={activePageParent}/> */}

            </div>
            {/* <button onClick={checkIfEmail}>Send Email</button> */}
        </>
        ) : (<div>Error Fetching Data</div>)
      }
    </div>
  );
}

export default EmployeeView;
