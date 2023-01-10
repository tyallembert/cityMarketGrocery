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
    const fetchCurrentEmployees = async() => {
        const data = await fetch('/getCurrentEmployees');
        const employees = await data.json();
        setCurrentEmployees(employees);
    }
    const toggleNewEmployeePopup = () => {
        showingPopup ? setShowingPopup(false): setShowingPopup(true);
    }
    const updateCurrentEmployees = (res) => {
        var newEmployee = res.employee;
        var id = res.id;
        setCurrentEmployees(...currentEmployees, id, newEmployee);
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
        console.log("RESPONSE"+id)
        updateCurrentEmployees({id: id, employee: newEmployee});
        console.log("--------------------");
        console.log(currentEmployees);
        toggleNewEmployeePopup();
    }
    const deleteEmployee = () => {

    }

    return (
        <div className="manageEmployeesContainer">
            <div className="addEmployeeButtonContainer">
                <button onClick={toggleNewEmployeePopup}>Add Employee</button>
                {showingPopup ? (
                    <AddEmployee saveNewEmployee={saveNewEmployee}/>
                ) : null
            }
            </div>
            <div className="displayContainer">
                {
                    Object.keys(currentEmployees).map((value, index) => {
                        return (
                            <div className="employee" key={index}>
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
