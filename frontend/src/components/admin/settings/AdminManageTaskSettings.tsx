import React, {useEffect, useState} from 'react';
import "../../../styles/adminSettings.scss";

type Props = {
    taskSettings: any
}
const AdminManageTaskSettings: React.FC<Props> = (props) => {
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);

    useEffect(() => {
        setTaskSettings(props.taskSettings);
    }, [props.taskSettings]);

    const handleNew = async(e: any) => {
        e.preventDefault();
        const subDepartment = e.target.parentNode.getAttribute("class").split(" ")[1];
        const type = e.target.parentNode.getAttribute("class").split(" ")[2]; 
        const newSetting = e.target.parentNode.firstChild.value;
        const res = await fetch("/newSetting", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subDepartment: subDepartment, type: type, newSetting: newSetting})
        });
        const data = await res.json();
        setTaskSettings(data);
        e.target.parentNode.firstChild.value = "";
    }
    const handleDelete = async(e: any) => {
        const subDepartment = e.target.parentNode.getAttribute("class").split(" ")[1];
        const type = e.target.parentNode.getAttribute("class").split(" ")[2]; 
        const option = e.target.parentNode.getAttribute("class").split(" ")[3];
        const res = await fetch("/deleteSetting", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subDepartment: subDepartment, type: type, option: option})
        });
        const data = await res.json();
        setTaskSettings(data);
    }
    return (
        <div className='adminManageTaskSettingsContainer'>
            {
                Object.entries(taskSettings).map((taskSetting: any) => {
                    return (
                        <div className={`taskSettingContainer ${taskSetting[0]}Setting`}>
                            <h2>{taskSetting[1].title}</h2>
                            {Object.entries(taskSetting[1].components).map((setting: any) => {
                                return (
                                    <div className='settingContainer'>
                                        <h3>{setting[1].title}</h3>
                                        {Object.entries(setting[1].options).map((option: any) => {
                                            return (
                                                <div key={option[0]} className={`optionContainer ${taskSetting[0]} ${setting[0]} ${option[0]}`}>
                                                    <p>{option[1]}</p>
                                                    <button className='button' onClick={handleDelete}>X</button>
                                                </div>
                                            )
                                        })}
                                        <div className={`optionContainer ${taskSetting[0]} ${setting[0]}`}>
                                            <input type="text" placeholder="Add New Option" />
                                            <button className='button new' onClick={handleNew}>+</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminManageTaskSettings