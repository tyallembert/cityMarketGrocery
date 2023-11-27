import React, { useState, useEffect } from 'react';
import "../../../styles/basicTemplate.scss";

type Props = {
    task: any,
    type: string
}

const LiveRowTemplate: React.FC<Props> = (props) => {

    return (
        <>
        {
            props.type === "dryGoodsLive" ? (
                <div className="liveRowContainer dryGoods">
                    <p className='singleElement'>
                        {props.task.name}
                    </p>
                    <p className='singleElement'>
                        {props.task.aisle}
                    </p>
                    <p className='singleElement'>
                        {props.task.boxes ? props.task.boxes : props.task.boats}
                    </p>
                    <p className='singleElement'>
                        {props.task.totes ? props.task.totes : props.task.boats}
                    </p>
                    <p className='singleElement'>
                        {props.task.start}
                    </p>
                    <p className='singleElement'>
                        {props.task.end ? props.task.end : "Not Finished"}
                    </p>
                </div>
            ): props.type === "perishablesLive" ? (
                <div className="liveRowContainer perishables">
                    <p className='singleElement'>
                        {props.task.distributerName}
                    </p>
                    <p className='singleElement'>
                        {props.task.arrival}
                    </p>
                    <p className='singleElement'>
                        {props.task.end ? props.task.end : "Not Finished"}
                    </p>
                </div>
            ): props.type === "upstock" ? (
                <div className="liveRowContainer perishables">
                    <p className='singleElement'>
                        {props.task.name}
                    </p>
                    <p className='singleElement'>
                        {props.task.aisle}
                    </p>
                    <p className='singleElement'>
                        {props.task.start}
                    </p>
                    <p className='singleElement'>
                        {props.task.end ? props.task.end : "Not Finished"}
                    </p>
                </div>
            ): null
        }
        </>
    )
}

export default LiveRowTemplate;