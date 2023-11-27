import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import "../../styles/admin.scss";
import AdminNav from './AdminNav';
import LoginForm from './LoginForm';
import AdminManageEmployees from './settings/AdminManageEmployees';
import AdminOverview from './overview/AdminOverview';
import AdminSettings from './settings/AdminSettings';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [activePage, setActivePage] = useState("");
    const [activePageObject, setActivePageObject] = useState(null);

    useEffect(() => {
        checkCookies();
    }, []);

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
    const pageChange = (res: any) => {
        setActivePage(res);
    }

    const handlePageChange = () => {
        var tempPage = null;
        switch(activePage){
            case 'overview':
                tempPage = <AdminOverview/>;
                break;
            case 'analytics':
                break;
            case 'manage':
                tempPage = <AdminSettings/>;
                break;
            default:
                tempPage = <AdminOverview/>;
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
            <>
                        <AdminNav pageChange={pageChange}/>
                        {activePageObject}
                    </>
            {/* {
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
            } */}
            {/* <button onClick={resetCookies}>Reset Cookies</button> */}
        </div>
    )
}

export default Admin;