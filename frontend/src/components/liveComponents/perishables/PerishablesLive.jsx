import { useState, useEffect } from 'react';
import "./perishablesLive.scss";
import TaskPerishables from './TaskPerishables';

function PerishablesLive(props) {
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
                taskSettings.liveFreight.components.perishablesLive.options.map((value) => {
                    return (
                        <TaskPerishables key={value}
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

export default PerishablesLive