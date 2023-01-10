import { useEffect, useState } from "react";
import "./objectPreview.scss";

function ObjectPreview(props) {
    const [type, setType] = useState("");
    const [task, setTask] = useState(props.task);
    const [listOptions, setListOptions] = useState(props.listOptions);
    useEffect(() => {
        setType(props.type);
        setTask(props.task);
        setListOptions(props.listOptions)
    }, [])
    useEffect(() => {

    }, [type])
    const handleChange = (event) => {
        var value = event.target.value;
        setTask({...task,["aisle"]: value});
        console.log(task)
        props.setNewTask(task);
    }
    const handleListChange = (event) => {
        var value = event.target.value;
        setType(value);
        props.setCustomType(value);
    }

    return (
        <div className={["objectPreviewContainer " + type]}>
            <p className="type">{type}</p>
            <select className="type" placeholder='Choose one' onChange={handleListChange}>
                {listOptions.map((value, index) => {
                        return (
                            <option value={value}>{value}</option>
                        )
                    })
                }
            </select>
            <div className="elementContainer aisle">
                <input type='text'
                    name="aisle"
                    className="aisleInput editable"
                    placeholder="Edit this" 
                    onChange={handleChange}
                />
                <p className="title">Aisle</p>
            </div>
            <div className="elementContainer name">
                <input type='text'
                    name="name"
                    className="nameInput"
                    placeholder="Name" 
                    disabled
                />
                <p className="title">Name</p>
            </div>
            <button className="startButton" disabled>Start</button>
        </div>
    )
}

export default ObjectPreview