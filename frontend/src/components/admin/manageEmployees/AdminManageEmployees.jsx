// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import { useState, useEffect } from "react";
import AddEmployee from "./AddEmployee";
import './adminManageEmployees.scss';

function AdminManageEmployees(props) {
    const [currentEmployees, setCurrentEmployees] = useState({});
    const [showingPopup, setShowingPopup] = useState(false);

    useEffect(() => {
        fetchCurrentEmployees();
    }, [])
    useEffect(() => {

    }, [currentEmployees])
    const fetchCurrentEmployees = async() => {
        const data = await fetch('/getCurrentEmployees');
        const employees = await data.json();
        setCurrentEmployees(employees);
    }
    const toggleNewEmployeePopup = () => {
        showingPopup ? setShowingPopup(false): setShowingPopup(true);
    }
    const updateCurrentEmployees = (res) => {
        var id = res.id;
        if(res.type === "add"){
            var newEmployee = res.employee;
            currentEmployees[id] = newEmployee;
            setCurrentEmployees({...currentEmployees});
        }else{
            delete currentEmployees[id];
            setCurrentEmployees({...currentEmployees});
        }
    }
    const saveNewEmployee = async(res) => {
        var newEmployee = res.employee;
        const response = await fetch("/saveNewEmployee", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({employee: newEmployee})
        });
        const id = response;
        updateCurrentEmployees({type: "add", id: id, employee: newEmployee});
        toggleNewEmployeePopup();
    }
    const deleteEmployee = async(e) => {
        var id = e.target.parentNode.getAttribute("id");
        const response = await fetch("/deleteEmployee", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        const resID = response;
        updateCurrentEmployees({type: "delete", id: id});
    }

    return (
        <div className="manageEmployeesContainer">
            <div className="addEmployeeContainer">
                {
                    showingPopup ? (<button className="button cancelButton" onClick={toggleNewEmployeePopup}>Cancel</button>)
                    : (<button className="button addEmployeeButton" onClick={toggleNewEmployeePopup}>Add Employee</button>)
                }
                {showingPopup ? (
                    <AddEmployee saveNewEmployee={saveNewEmployee}/>
                ) : null
            }
            </div>
            <div className="displayContainer">
                {
                    Object.keys(currentEmployees).map((value, index) => {
                        return (
                            <div className="employee" id={value} key={index}>
                                <p>{currentEmployees[value].firstName} {currentEmployees[value].lastName}</p>
                                <button className="deleteUserButton" onClick={deleteEmployee}>x</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default AdminManageEmployees;
