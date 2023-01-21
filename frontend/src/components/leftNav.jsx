import { useEffect, useState } from "react";
import "./leftNav.scss";

function LeftNav(props) {
    const navClasses = {
        all: "all navChild",
        liveFreight: "liveFreight navChild",
        upstock: "upstock navChild small",
        backstock: "backstock navChild small",
        sectors: "sectors navChild small",
        rounding: "rounding navChild small",
        bulk: "bulk navChild small",
        peri: "peri navChild small",
        beerWine: "beerWine navChild small"
    };
    const [navSettings, setNavSettings] = useState(props.navSettings);
    useEffect(() => {
        setNavSettings(props.navSettings)
    }, [])

    const setActivePage = (e) => {
        var page = e.currentTarget.className.split(" ");
        props.updateActivePage(page[0]);
    };
    return (
        <div className="leftNavContainer">
            <div className={navClasses.liveFreight} onClick={setActivePage}>
                <p>Live Freight</p>
                <div className="arrow"></div>
            </div>
            <div className={navClasses.all} onClick={setActivePage}>
                <p>All To Do</p>
                <div className="arrow"></div>
            </div>

            <div className="afterLive">
            {
                Object.keys(navSettings).map((value, index) => {
                    if(navSettings[value].classes.includes("small")){
                        return (
                            <div key={index} className={navSettings[value].classes} onClick={setActivePage}>
                                <p>{navSettings[value].title}</p>
                                <div className="arrow"></div>
                            </div>
                        );
                    }else{
                        return;
                    }
                })
            }
            </div>
        </div>
    )
}

export default LeftNav