import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import "../../styles/admin.scss";
import AdminNav from './AdminNav';
import LoginForm from './LoginForm';
import AdminManageEmployees from './settings/AdminManageEmployees';
import AdminOverview from './overview/AdminOverview';

function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);

    const [activePage, setActivePage] = useState("");
    const [activePageObject, setActivePageObject] = useState(null);
    const [navSettings, setNavSettings] = useState({});

    useEffect(() => {
        checkCookies();
        fetchNavSettings();
    }, []);

    useEffect(() => {
        handlePageChange();
    }, [navSettings])
    useEffect(() => {
        handlePageChange();
    }, [activePage, loggedIn])
    const checkCookies = () => {
        const cookies = new Cookies();
        try{
            var currentUser = cookies.get('currentUser');
            if(currentUser.username !== "" && currentUser.password !== ""){
                setLoggedIn(true);
            }
        }catch(error){
            console.log("No User Cookies")
        }
    }
    const pageChange = (res) => {
        setActivePage(res);
    }
    const fetchNavSettings = async() => {
        const data = await fetch('/getNavSettings');
        const settings = await data.json();
        console.log(settings);
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
    const resetCookies = () => {
        const cookies = new Cookies();
        cookies.remove('currentUser', { path: '/' });
        console.log("removed cookies")
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
                    <LoginForm setLoggedIn={setLoggedIn}/>
                    </>
                )
            }
            <button onClick={resetCookies}>Reset Cookies</button>
        </div>
    )
}

export default Admin;