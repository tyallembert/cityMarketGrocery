// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import React, { useState, useEffect } from "react";
import AddEmployee from "./AddEmployee";
import '../../../styles/adminManageEmployees.scss';

type Props = {
    employees: any
}
const AdminManageEmployees: React.FC<Props> = (props) => {
    const [currentEmployees, setCurrentEmployees] = useState(props.employees);
    const [showingPopup, setShowingPopup] = useState(false);

    useEffect(() => {
        setCurrentEmployees(props.employees);
    }, [props.employees]);

    const toggleNewEmployeePopup = () => {
        showingPopup ? setShowingPopup(false): setShowingPopup(true);
    }
    const updateCurrentEmployees = (res:any) => {
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
    const saveNewEmployee = async(res: any) => {
        var newEmployee = res.employee;
        var id = (Math.random() + 1).toString(36).slice(2,10);
        updateCurrentEmployees({type: "add", id: id, employee: newEmployee});
        await fetch("/saveNewEmployee", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({employee: currentEmployees})
        });
        toggleNewEmployeePopup();
    }
    const deleteEmployee = async(e: any) => {
        var id = e.target.parentNode.getAttribute("id");
        await fetch("/deleteEmployee", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
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
