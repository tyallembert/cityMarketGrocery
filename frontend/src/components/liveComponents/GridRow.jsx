import { useState, useEffect } from 'react';
import "./gridRow.scss";

function GridRow(props) {
    const [currentAisle, setCurrentAisle] = useState(props.aisle);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [id, setId] = useState(props.id);
    useEffect(() => {
        checkIfFinished();
        setId(props.id)
    }, []);

    const handleFinish = async() => {
        var tempAisle = {};
        var today = new Date();
        var time = today.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        tempAisle.name = currentAisle.name;
        tempAisle.aisle = currentAisle.aisle;
        tempAisle.boxes = currentAisle.boxes;
        tempAisle.start = currentAisle.start;
        tempAisle.end = time;
        tempAisle.status = "Finished";
        setCurrentAisle(tempAisle);

        props.updateTasks({id: id, task: tempAisle});
        // await fetch("/saveData", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify([id, JSON.stringify(tempAisle)])
        // });

    };
    const checkIfFinished = () => {
        // var tempAisle = currentAisle;
        // if (tempAisle.end === ""){
        //     tempAisle.end = (
        //         <button onClick={handleFinish} className='endButton'>
        //             <p>End</p>
        //         </button>
        //     )
        // }
        // setCurrentAisle(tempAisle);
        setDataLoaded(true);
    };

    return (
        // <div className="gridRowContainer">
        <>
            {
            dataLoaded ? (
                <div className="gridRowContainer">
                    <div className="rowElement name">
                        <p>{currentAisle.name}</p>
                    </div>
                    <div className="rowElement aisle">
                        <p>{currentAisle.aisle}</p>
                    </div>
                    <div className="rowElement box">
                        <p>{currentAisle.boxes}</p>
                    </div>
                    <div className="rowElement start">
                        <p>{currentAisle.start}</p>
                    </div>
                    <div className="rowElement end">
                        {
                        currentAisle.end === "" ? (
                            <button onClick={handleFinish} className='endButton'>
                                <p>End</p>
                            </button>
                        ) : (currentAisle.end)
                        }
                    </div>
                    <div className="rowElement status">
                        <p className={currentAisle.status}>{currentAisle.status}</p>
                    </div>
                </div>
            )
                    : (null)
            }
            
        </>
    )
}

export default GridRow;