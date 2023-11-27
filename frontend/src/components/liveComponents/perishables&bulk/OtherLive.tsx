import React, { useState, useEffect } from 'react';
import "../../../styles/otherLive.scss";
import TaskLive from './TaskLive';
import { Employee } from '../../../types';

type Props = {
    activePage: string,
    tasks: any,
    taskSettings: any,
    employees: {[key: string]: Employee}
    updateTasks: (task: any, id: string, type: string, subType: string) => void
}

const OtherLive:React.FC<Props> = (props) => {
    const [tasks, setTasks] = useState(props.tasks);
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    const [activePage, setActivePage] = useState(props.activePage);

    useEffect(() => {
        setActivePage(props.activePage);
        setTasks(props.tasks)
        setTaskSettings(props.taskSettings)
    }, [props.activePage, props.tasks, props.taskSettings])
    const liveFinished = () => {

    }
    return (
        <div className="perishablesLiveContainer">
            {
                taskSettings.liveFreight.components[activePage].options.map((value:any) => {
                    return (
                        <TaskLive key={value}
                        title={value}/>
                    )
                })
            }
            <input type="button"
            className='finishPerishablesButton button'
            value="Finish"
            onClick={liveFinished}/>
        </div>
    )
}

export default OtherLive