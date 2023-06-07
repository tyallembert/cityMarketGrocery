import React, { useState, useEffect } from 'react';
import "../../../styles/taskLive.scss";

type Props = {
    title: string
}
const TaskLive: React.FC<Props> = (props) => {
    const [title, setTitle] = useState(props.title);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setTitle(props.title);
    }, [props.title])
    const toggleChecked = () => {
        setChecked(!checked);
    }
    return (
        <div className={checked ? "taskPerishablesContainer isChecked": "taskPerishablesContainer"} onClick={toggleChecked}>
            <div className='outerCircle'>
                <div className='innerCircle'></div>
            </div>
            <p className='taskTitle'>{title}</p>
        </div>
    )
}

export default TaskLive