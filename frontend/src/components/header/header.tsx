import React, { useState, useEffect, useCallback } from "react";
import "../../styles/header.scss";
import ShrinkLog from "./ShrinkLog";
import { Employee } from "../../types";
import HelpPage from "./HelpPage";

type Props = {
    activePage: string,
    activePageParent: string,
    taskSettings: any,
    employees: {[key: string]: Employee}
}

const Header: React.FC<Props> = (props) => {
    const [dateState, setDateState] = useState(new Date());
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateState(new Date());
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const getHeaderFromSettings = useCallback(() => {
        if (props.activePage !== "") {
            setPageTitle(props.taskSettings[props.activePageParent]?.components[props.activePage]?.title || "");
        } else {
            if (props.taskSettings[props.activePageParent]?.title !== undefined) {
                setPageTitle(props.taskSettings[props.activePageParent].title);
            } else {
                setTimeout(() => {
                    getHeaderFromSettings();
                }, 300);
            }
        }
    }, [props.taskSettings, props.activePage, props.activePageParent]);

    useEffect(() => {
        getHeaderFromSettings();
    }, [getHeaderFromSettings]);

    return (
        <div className={"headerContainer " + props.activePage}>
            <div className="dateContainer">
                <div className="top">
                    <p className="day">
                        {dateState.toLocaleDateString('en-GB', {
                            weekday: 'long'
                        })},
                    </p>
                    <p className="fullDate">
                        {dateState.toLocaleDateString('en-US', {
                            date: 'short'
                        })}
                    </p>
                </div>
                <p className="time">
                    {dateState.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}
                </p>
            </div>
            <div className="titleContainer">
                <h1>{pageTitle}</h1>
                <div className="buttonsContainer">
                    <ShrinkLog employees={props.employees} />
                    <HelpPage />
                </div>
            </div>
        </div>
    );
}

export default Header;
