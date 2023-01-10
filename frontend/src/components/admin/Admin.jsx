import { useState, useEffect } from 'react';
import "./admin.scss";
import AdminNav from './AdminNav';
import AdminManageEmployees from './manageEmployees/AdminManageEmployees';
import AdminOverview from './overview/AdminOverview';

function Admin(props) {
    const [activePage, setActivePage] = useState("");
    const [activePageObject, setActivePageObject] = useState(null);

    useEffect(() => {
        handlePageChange();
    }, [activePage])

    const pageChange = (res) => {
        setActivePage(res);
    }
    const handlePageChange = () => {
        var tempPage = null;
        switch(activePage){
            case 'overview':
                tempPage = <AdminOverview navSettings={props.navSettings}/>;
                break;
            case 'analytics':
                break;
            case 'manage':
                tempPage = <AdminManageEmployees navSettings={props.navSettings}/>;
                break;
            default:
                tempPage = <AdminOverview navSettings={props.navSettings}/>;
                break;
        }
        setActivePageObject(tempPage);
    }
    return (
        <div className="adminContainer">
            <AdminNav pageChange={pageChange}/>
            {activePageObject}
        </div>
    )
}

export default Admin;