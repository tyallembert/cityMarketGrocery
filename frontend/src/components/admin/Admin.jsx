import { useState, useEffect } from 'react';
import "./admin.scss";
import AdminNav from './AdminNav';
import LoginForm from './LoginForm';
import AdminManageEmployees from './manageEmployees/AdminManageEmployees';
import AdminOverview from './overview/AdminOverview';

function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);

    const [activePage, setActivePage] = useState("");
    const [activePageObject, setActivePageObject] = useState(null);
    const [navSettings, setNavSettings] = useState({});

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    useEffect(() => {
        fetchNavSettings();
    }, []);

    useEffect(() => {
        console.log(navSettings)
        handlePageChange();
    }, [navSettings])
    useEffect(() => {
        handlePageChange();
    }, [activePage])

    const checkIfLoggedIn = () => {

    }
    const pageChange = (res) => {
        setActivePage(res);
    }
    const fetchNavSettings = async() => {
        const data = await fetch('/getNavSettings');
        const settings = await data.json();
        setNavSettings(settings);
      }
    const handlePageChange = () => {
        var tempPage = null;
        switch(activePage){
            case 'overview':
                tempPage = <AdminOverview navSettings={navSettings}/>;
                break;
            case 'analytics':
                break;
            case 'manage':
                tempPage = <AdminManageEmployees navSettings={navSettings}/>;
                break;
            default:
                tempPage = <AdminOverview navSettings={navSettings}/>;
                break;
        }
        setActivePageObject(tempPage);
    }
    return (
        <div className="adminContainer">
            {
                loggedIn ? (
                    <>
                        <AdminNav pageChange={pageChange}/>
                        {activePageObject}
                    </>
                ):(
                    <>
                    <LoginForm checkIfLoggedIn={checkIfLoggedIn}/>
                    </>
                )
            }
        </div>
    )
}

export default Admin;