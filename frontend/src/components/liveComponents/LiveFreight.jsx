import { useState, useEffect } from 'react';
import "../../styles/liveFreight.scss";
import DryGoodsLive from './dryGoods/DryGoodsLive';
import OtherLive from './perishables&bulk/OtherLive';

function LiveFreight(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [activePage, setActivePage] = useState(props.activePage);

    useEffect(() => {
        setActivePage(props.activePage)
    }, [props.activePage])
    const updateTasks = async(res) => {
        let newId = res.id;
        let tempTasks = {...tasks};
        tempTasks["liveFreight"]["dryGoodsLive"][newId] = (res.task);
        await fetch("/saveData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempTasks)
        });
        setTasks(tempTasks)
    }
    switch(activePage){
        case "dryGoodsLive":
            return (
                <DryGoodsLive updateTasks={updateTasks} 
                activePage={"dryGoodsLive"} 
                tasks={tasks}
                employees={props.employees}/>
            )
        case "perishablesLive":
            return (
                <OtherLive updateTasks={updateTasks} 
                activePage={"perishablesLive"} 
                taskSettings={props.taskSettings} 
                tasks={tasks}
                employees={props.employees}/>
            )
        case "bulkLive":
            return (
                <OtherLive updateTasks={updateTasks} 
                activePage={"bulkLive"} 
                taskSettings={props.taskSettings} 
                tasks={tasks}
                employees={props.employees}/>
            )
        default:
            return (
                <DryGoodsLive updateTasks={updateTasks} 
                activePage={"dryGoodsLive"} 
                tasks={tasks}
                employees={props.employees}/>
            )
    }
}

export default LiveFreight