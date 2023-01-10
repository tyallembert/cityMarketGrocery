import { useState, useEffect } from 'react';
import "./adminNav.scss";

function AdminNav(props) {
    const [navClasses, setNavClasses] = useState({
        overview: "overview navChild activeNav",
        analytics: "analytics navChild",
        manage: "manage navChild"
    });

    const updateActivePage = async(e) => {
        var name = e.currentTarget.className.split(" ")[0];
        var tempNavClasses = {...navClasses};
        for(var element in tempNavClasses){
            var stringArray = tempNavClasses[element].split(" ");
            if(stringArray.includes(name)){
                tempNavClasses[element] = stringArray[0] + " " + stringArray[1] + " activeNav";
            }
            if(stringArray.includes("activeNav")){
                tempNavClasses[element] = stringArray[0] + " " + stringArray[1];
            }
        }
        setNavClasses(tempNavClasses);
        props.pageChange(name);
    }
    return (
        <div className="adminNavContainer">
            <div className={navClasses.overview} onClick={updateActivePage}>
                <p>Overview</p>
            </div>
            <div className={navClasses.analytics} onClick={updateActivePage}>
                <p>Analytics</p>
            </div>
            <div className={navClasses.manage} onClick={updateActivePage}>
                <p>Manage Employees</p>
            </div>
        </div>
    )
}

export default AdminNav;