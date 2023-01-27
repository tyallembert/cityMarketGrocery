import { useEffect, useState } from "react";
import "./leftNav.scss";
import {motion} from 'framer-motion';

function LeftNav(props) {
    const [activePage, setActivePage] = useState("liveFreight");
    const [navSettings, setNavSettings] = useState(props.navSettings);
    useEffect(() => {
        setNavSettings(props.navSettings);
        console.log(props.navSettings);
    }, [])
    useEffect(() => {
        setNavSettings(props.navSettings);
    }, [activePage, navSettings])

    const changeActivePage = (e) => {
        var page = e.currentTarget.className.split(" ");
        console.log(e.currentTarget)
        console.log(page[0])
        if(page[2] === "subChild"){
            var parentType = e.currentTarget.parentNode.parentNode.className.split(" ")[0];
            console.log(navSettings[parentType][page[0]])
            console.log(page[0])
            navSettings[activePage].classes = navSettings[activePage].classes.replace('activePage','');
            navSettings[parentType].components[page[0]].classes = navSettings[parentType].components[page[0]].classes + " activePage";
        }else{
            navSettings[activePage].classes = navSettings[activePage].classes.replace('activePage','');
            navSettings[page[0]].classes = navSettings[page[0]].classes + " activePage";
        }
        setActivePage(page[0]);
        props.updateActivePage(page[0]);
    };
    return (
        <div className="leftNavContainer">
            {
                Object.keys(navSettings).map((outer) => {
                    return(
                        <div key={outer} className={navSettings[outer].classes}>
                            <div className={navSettings[outer].classes.split(" ")[0] + " mainNavButton"} onClick={changeActivePage}>
                                <p>{navSettings[outer].title}</p>
                                <div className="arrow"></div>
                            </div>
                            {/* <p>{navSettings[outer].title}</p>
                            <div className="arrow"></div> */}
                            {
                                activePage === outer ? (
                                <motion.div className="subNavsContainer"
                                initial={{height: "0px"}}
                                animate={{height: "auto"}}
                                exit={{height: 0}}>
                                    {
                                    Object.keys(navSettings[outer].components).map((value) => {
                                        return (
                                            <div key={value} className={navSettings[outer].components[value].classes} onClick={changeActivePage}>
                                                <p>{navSettings[outer].components[value].title}</p>
                                            </div>
                                        )
                                    })
                                    }
                                </motion.div>
                                ) : null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LeftNav