import React, { useState, ChangeEvent } from 'react';
import { Employee } from '../types';
import "../styles/employeeSelect.scss";

type Props = {
    employees: {[key:string]: Employee},
    onSelect: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
}

const EmployeeSelect: React.FC<Props> = (props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        props.onSelect(event);
    };
    return (
        <select className="nameInput" name="name" onChange={handleChange}>
            <option value="choose">Choose</option>
        {
            Object.keys(props.employees).map((key: string) => {
                var firstLastInit = props.employees[key].firstName + " "+ props.employees[key].lastName[0];
                return (
                    <option key={key} value={firstLastInit}>{firstLastInit}</option>
                )
            })
        }
        </select>
    )
}

export default EmployeeSelect;