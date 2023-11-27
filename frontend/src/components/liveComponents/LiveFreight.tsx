import React, { useState, useEffect } from 'react';
import "../../styles/liveFreight.scss";
import DryGoodsLive from './dryGoods/DryGoodsLive';
import OtherLive from './perishables&bulk/OtherLive';
import PerishablesLive from './perishables&bulk/PerishablesLive';
import { Employee } from '../../types';

type Props = {
    activePage: string,
    tasks: any,
    employees: {[key: string]: Employee},
    taskSettings: any,
    updateTasks: (tas: any, id: string, type: string, subType: string) => void
}

const LiveFreight: React.FC<Props> = (props) => {
    const [activePage, setActivePage] = useState(props.activePage);

    useEffect(() => {
        setActivePage(props.activePage)
    }, [props.activePage])
    
    switch(activePage){
        case "dryGoodsLive":
            return (
                <DryGoodsLive updateTasks={props.updateTasks} 
                activePage={"dryGoodsLive"} 
                tasks={props.tasks}
                employees={props.employees}/>
            )
        case "perishablesLive":
            return (
                <PerishablesLive title={"example"}
                tasks={props.tasks}
                employees={props.employees}
                updateTasks={props.updateTasks}/>
            )
        case "bulkLive":
            return (
                <OtherLive updateTasks={props.updateTasks} 
                activePage={"bulkLive"} 
                taskSettings={props.taskSettings} 
                tasks={props.tasks}
                employees={props.employees}/>
            )
        default:
            return (
                <DryGoodsLive updateTasks={props.updateTasks} 
                activePage={"dryGoodsLive"} 
                tasks={props.tasks}
                employees={props.employees}/>
            )
    }
}

export default LiveFreight