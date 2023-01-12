// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import { useState, useEffect } from "react";
import './App.scss';
import Header from "./components/header";
import LeftNav from "./components/leftNav";
import Main from "./components/main";
import Admin from "./components/admin/Admin";

function App() {
  const [adminActive, setAdminActive] = useState(false);


  // SEND THE PAGES VARIABLES OVER TO ALL PAGES THAT NEED IT

  const [activePage, setActivePage] = useState("liveFreight");
  const [currentTasks, setCurrentTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [navSettings, setNavSettings] = useState({});

  //Check if its time to send email
  useEffect(() => {
    // setInterval(checkIfEmail, 3000);
  }, []);

  useEffect(() => {
    fetchNavSettings();
    fetchEmployees();
  }, []);
  useEffect(() => {
    fetchCurrentTasks();
  }, [activePage]);
  useEffect(() => {
  }, [currentTasks]);

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
        body: JSON.stringify({variable: "example"})
      });
    }
  }
  const fetchCurrentTasks = async() => {
    const data = await fetch('/currentTasks');
    const tasks = await data.json();
    setCurrentTasks(tasks);
    setDataFetched(true);
  }
  const fetchEmployees = async() => {
    const data = await fetch('/getCurrentEmployees');
    const tempEmployees = await data.json();
    setEmployees(tempEmployees);
  }
  const fetchNavSettings = async() => {
    const data = await fetch('/getNavSettings');
    const settings = await data.json();
    setNavSettings(settings);
  }

  const updateCurrentTasks = async(res) => {
    var type = res.type;
    var data = res.task;
    var id = res.id;
    var tempTasks = {...currentTasks};
    console.log("TYPE: "+type);
    tempTasks[type][id] = await {...data};
    setCurrentTasks(tempTasks);
  }

  const updateActivePage = (res) => {
    setActivePage(res);
  }

  const toggleAdmin = () => {
    adminActive ? setAdminActive(false): setAdminActive(true);
  }

  return (
    <div className="App">
      {
        dataFetched ? 
        (
        <>
        {
          adminActive ?
          (
            <>
            <Header activePage={activePage} navSettings={navSettings} updateCurrentTasks={updateCurrentTasks}/>
            <div className="contentContainer">
              <LeftNav navSettings={navSettings} updateActivePage={updateActivePage}/>
              <Main activePage={activePage} tasks={currentTasks}/>
            </div>
            </>
          ) : (<Admin navSettings={navSettings}/>)
        }
          <button onClick={toggleAdmin} style={{margin: 20}}>Toggle Admin</button>
          <button onClick={checkIfEmail} style={{margin: 20}}>check email</button>
        </>
        ) : (<div>Error Fetching Data</div>)
      }
    </div>
  );
}

export default App;
