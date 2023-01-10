import { useState, useEffect } from 'react';
import "./basicTemplate.scss";

function BasicTemplate(props) {
    const [activeTask, setActiveTask] = useState(props.activeTask);
    const [task, setTask] = useState(props.task);
    const [isAll, setIsAll] = useState(props.isAll);
    
    useEffect(() => {
        setActiveTask(props.activeTask);
        setTask(props.task);
        setIsAll(props.isAll);
    }, [])
    const setContainerClass = () => {
        var theClass = "";
        if(isAll){
            theClass = "basicTemplateContainer " +activeTask;
        }else{
            theClass = "basicTemplateContainer";
        }
        return theClass; 
    }
    return (
        <div className={setContainerClass()}>
            <div className='singleElement'>
                {task.name}
            </div>
            <div className='singleElement'>
                {task.aisle}
            </div>
            <div className='singleElement'>
                {task.boxes ? task.boxes : task.boats}
            </div>
            <div className='singleElement'>
                {task.start}
            </div>
            <div className='singleElement'>
                {task.end}
            </div>
        </div>
    )
}

export default BasicTemplate;