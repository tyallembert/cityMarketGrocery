import React, { useState, useEffect } from 'react';
import "../../../styles/gridTable.scss";
import GridRow from './GridRow';
import { Employee } from '../../../types';

type Props = {
    newAisleActive: boolean,
    tasks: any,
    employees: {[key:string]: Employee},
    updateTasks: any
}

const GridTable: React.FC<Props> = (props) => {
    const [rowObjects, setRowObjects] = useState([]);
    const [tasks, setTasks] = useState(props.tasks);
    useEffect(() => {
        setTasks(props.tasks);
    }, [props.tasks])

    useEffect(() => {
        populateAisles();
    }, [tasks]);

    const populateAisles = () => {
        if(Object.keys(tasks.liveFreight.dryGoodsLive).length !== 0){
            var allRows = []
            for(var key in tasks.liveFreight.dryGoodsLive){
                allRows.push(<GridRow employees={props.employees} updateTasks={props.updateTasks} aisle={tasks.liveFreight.dryGoodsLive[key]} id={key} key={key} />);
            }
            setRowObjects(allRows);
        }else{
            var placeholder = (
                <div className='placeholderText'>
                    <h2>No Aisles have been started today</h2>
                </div>
            );
            setRowObjects(placeholder);
        }

    }
    return (
        <div className="gridTableContainer">
            <div className="headerRow">
                <div className="headerElement name">
                    <p>Name</p>
                </div>
                <div className="headerElement aisle">
                    <p>Aisle #</p>
                </div>
                <div className="headerElement box">
                    <p>Box Count</p>
                </div>
                <div className="headerElement start">
                    <p>Start Time</p>
                </div>
                <div className="headerElement end">
                    <p>End Time</p>
                </div>
                <div className="headerElement status">
                    <p>Status</p>
                </div>
            </div>
            {/* prints all tasks in live sheet */}
            {rowObjects}
        </div>
    )
}

export default GridTable;