// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import React, { useState, useEffect } from "react";
import '../../../styles/addEmployee.scss';

type Props = {
    saveNewEmployee: any
}

const AddEmployee: React.FC<Props> = (props) => {
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: ""
    });
    const handleChange = (event:any) => {
        setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });
    }
    const handleSubmit = (e:any) => {
        e.preventDefault();
        props.saveNewEmployee({employee: newEmployee});
    }

    return (
        <div className="addNewEmployeeContainer">
            <h2 className="formTitle">New Employee</h2>
            <form className='formContainer' onSubmit={handleSubmit}>
                <label>
                    <p>First Name</p>
                    <input type="text" 
                    name="firstName"
                    value={newEmployee.firstName} 
                    onChange={handleChange} 
                    maxLength={20}/>
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" 
                    name="lastName"
                    value={newEmployee.lastName} 
                    onChange={handleChange} 
                    maxLength={20}/>
                </label>
                <input type="submit" 
                    name="submit"
                    className="submitButton"
                    value="Add" />
            </form>
        </div>
    );
}

export default AddEmployee;
