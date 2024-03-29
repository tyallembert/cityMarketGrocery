import React, { useState } from 'react';
import "../../../styles/dryGoodsLive.scss";
import GridTable from './GridTable';
import StartButton from './StartButton';
import NewAislePopup from './NewAislePopup';
import { Employee, Tasks } from '../../../types';

type Props = {
    activePage: string,
    tasks: Tasks,
    employees: {[key:string]: Employee},
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}

const DryGoodsLive: React.FC<Props> = (props) => {
    const [showingPopUp, setShowingPopUp] = useState<boolean>(false);

    const togglePopup = (res: boolean) => {
        setShowingPopUp(res);
    }
    return (
        <div className="dryGoodsLiveContainer">
            <StartButton togglePopup={togglePopup}/>
            {showingPopUp ? (
                <NewAislePopup
                    togglePopup={togglePopup} updateTasks={props.updateTasks} employees={props.employees} activePage={props.activePage} />
            ) : (null)
            }
            <GridTable employees={props.employees} updateTasks={props.updateTasks} newAisleActive={showingPopUp} tasks={props.tasks}/>
        </div>
    )
}

export default DryGoodsLive