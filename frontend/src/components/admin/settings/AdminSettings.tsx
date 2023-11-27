import React, {useEffect, useState} from 'react';
import "../../../styles/adminSettings.scss";
import AdminManageEmployees from './AdminManageEmployees';
import { Employee } from '../../../types';
import AdminManageTaskSettings from './AdminManageTaskSettings';

const AdminSettings: React.FC = () => {
    const [employees, setEmployees] = useState<{[key: string]: Employee}>({});
    const [taskSettings, setTaskSettings] = useState({});

    useEffect(() => {
        fetchEmployees();
        fetchTaskSettings();
        console.log("fetching employees")
    }, []);

    const fetchEmployees = async() => {
        const data = await fetch('/getCurrentEmployees');
        const tempEmployees = await data.json();
        setEmployees(tempEmployees);
    }
    const fetchTaskSettings = async() => {
        const data = await fetch('/getTaskSettings');
        const settings = await data.json();
        setTaskSettings(settings);
    }

    return (
        <div className='adminSettingsContainer'>
            <div className='manageEmployeesSettingsContainer'>
                <h1>Manage Employees</h1>
                <AdminManageEmployees employees={employees} />
            </div>
            <div className='manageTaskSettingsContainer'>
                <h1>Manage Settings</h1>
                <AdminManageTaskSettings taskSettings={taskSettings} />
            </div>
        </div>
    )
}

export default AdminSettings