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
    const setActivePage = (e) => {
        var page = e.currentTarget.className.split(" ");
        props.updateActivePage(page[0]);
    };
    const toggleNav = () => {
        console.log('Hello!'); // implement this later when add minimize button
    }
    return (
        <div className="leftNavContainer" onClick={toggleNav}>
            <div className={navClasses.liveFreight} onClick={setActivePage}>
                <p>Live Freight</p>
                <div className="arrow"></div>
            </div>
            <div className={navClasses.all} onClick={setActivePage}>
                <p>All To Do</p>
                <div className="arrow"></div>
            </div>

            <div className="afterLive">
                <div className={navClasses.upstock} onClick={setActivePage}>
                    <p>Upstock</p>
                    <div className="arrow"></div>
                </div>
                <div className={navClasses.backstock} onClick={setActivePage}>
                    <p>Backstock</p>
                    <div className="arrow"></div>
                </div>
                <div className={navClasses.sectors} onClick={setActivePage}>
                    <p>Sectors</p>
                    <div className="arrow"></div>
                </div>
                <div className={navClasses.rounding} onClick={setActivePage}>
                    <p>Rounding</p>
                    <div className="arrow"></div>
                </div>
                <div className={navClasses.bulk} onClick={setActivePage}>
                    <p>Bulk</p>
                    <div className="arrow"></div>
                </div>
                <div className={navClasses.peri} onClick={setActivePage}>
                    <p>Peri</p>
                    <div className="arrow"></div>
                </div>
                <div className={navClasses.beerWine} onClick={setActivePage}>
                    <p>B/W</p>
                    <div className="arrow"></div>
                </div>
            </div>
        </div>
    )
}

export default LeftNav