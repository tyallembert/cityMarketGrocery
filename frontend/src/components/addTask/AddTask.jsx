import { useState, useEffect} from 'react';
import "./addTask.scss";
import Objectpreview from './ObjectPreview';

function AddTask(props) {
    const [showingPopup, setShowingPopup] = useState(false);
    const [taskType, setTaskType] = useState("");
    const [listOptions, setListOptions] = useState([]);
    const [settings, setSettings] = useState("");
    const [moreInfo, setMoreInfo] = useState([]);
    const [activeRadio, setActiveRadio] = useState("");

    const [customType, setCustomType] = useState("");
    const [newTask, setNewTask] = useState({
        name: "",
        aisle: "",
        boats: "",
        start: "",
        end: "",
        status:"To Do"
    });


    useEffect(() => {
        fetchSettings()
        setupWindow()
    }, [showingPopup])
    useEffect(() => {
        refreshMoreInfo();
    }, [taskType, activeRadio])
    const handleShowPopup = () => {
        setShowingPopup(true);
    }
    const handleClosePopup = () => {
        setShowingPopup(false);
        setActiveRadio("");
        setTaskType("");
        setMoreInfo([]);
        setListOptions([]);
    }
    const handleRadioChange = (e) => {
        var input = e.target;
        var tempTask = {...newTask};
        tempTask.aisle = input.value;
        setNewTask(tempTask);
        setActiveRadio(input.value);
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        var type = (taskType === "custom") ? customType: taskType;
        const response = await fetch("/saveNewTask", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([type, JSON.stringify(newTask)])
        });
        const id = await response.json();

        await props.updateCurrentTasks({type: type, task: newTask, id: id})
        handleClosePopup();
    }
    const fetchSettings = async() => {
        const response = await fetch("/getAddTaskSettings");
        var data = await response.json();
        setSettings(data);
    }
    const setupWindow = () => {
        var tempList = [];
        tempList.push(
            <option value='none' selected hidden disabled>Choose an option</option>
        )
        for(var page in props.navSettings){
            if(Object.keys(settings).includes(page)){
                var tempOption = (<option value={page}>{props.navSettings[page].title}</option>)
                tempList.push(tempOption)
            }
        }
        tempList.push(<option value="custom">Custom</option>)
        setListOptions(tempList);
    }
    const refreshMoreInfo = () => {
        var tempOptions = [];
        if(taskType === "custom"){
            tempOptions.push(
                <div className={'customContainer'}>
                    <h3>Preview</h3>
                    <Objectpreview editable={true} 
                    listOptions={settings.custom} 
                    setCustomType={setCustomType}
                    setNewTask={setNewTask}
                    task={newTask} 
                    id={"000000"} />
                </div>
            )
        }else{
            for(var i in settings[taskType]){
                tempOptions.push(
                    <label key={i} className={ parseInt(activeRadio) === settings[taskType][i] ? 'radioContainer activeRadio': 'radioContainer'} >
                        <input type="radio" 
                        className="moreInfoRadio" 
                        name="moreInfoRadio" 
                        onChange={handleRadioChange}
                        value={settings[taskType][i]} />
                        {settings[taskType][i]}
                    </label>
                )
            }
        }
        setMoreInfo(tempOptions);
    }
    const handleListChange = async(event) => {
        var value = event.target.value;
        setTaskType(value)
        refreshMoreInfo();
    };
        return (
            <div className="addTaskContainer">
                <button className="addButton" onClick={handleShowPopup}>
                    <p><span>+</span> Add Task</p>
                </button>
                {
                    showingPopup ? (
                        <>
                        <div className='background'></div>
                        <form className='popUpContainer' method='POST'>
                            <h2>New Task</h2>
                            <div className='customSelect'>
                                <select placeholder='Choose Option' onChange={handleListChange}>
                                    {listOptions}
                                </select>
                                <div className='iconContainer'>
                                    <div className='line1'></div>
                                    <div className='line2'></div>
                                    <div className='line3'></div>
                                </div>
                            </div>
                            <div className='moreInfoContainer'>
                                {moreInfo}
                            </div>
                            <div className='buttonsContainer'>
                                <button type='submit' className="button submitButton" onClick={handleSubmit}>
                                    <p>Submit</p>
                                </button>
                                <button className="button cancelButton" onClick={handleClosePopup}>
                                    <p>Cancel</p>
                                </button>
                            </div>
                        </form>
                        </>
                    ) : null
                }
            </div>
        )
}

export default AddTask