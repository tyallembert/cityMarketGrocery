
import React, { useState } from "react";
import "../styles/leftNav.scss";
import {motion} from 'framer-motion';

type Props = {
    taskSettings: any,
    updateActivePage: any
}
const LeftNav: React.FC<Props> = (props) => {
    const [activePageParent, setActivePageParent] = useState("liveFreight");

    const changeActivePage = (e: any) => {
        var classes = e.currentTarget.className.split(" ");
        props.updateActivePage({activePage: classes[0], parent: activePageParent});
    };

    const handleParentClick = (e: any) => {
        var classes = e.currentTarget.className.split(" ");
        setActivePageParent(classes[0]);
        props.updateActivePage({activePage: "", parent: classes[0]});
    }
    return (
        <div className="leftNavContainer">
            {
                Object.keys(props.taskSettings).map((parent) => {
                    return(
                        <div key={parent} className={`${parent} navChild`}>
                            <div className={`${parent} mainNavButton`} onClick={handleParentClick}>
                                <p>{props.taskSettings[parent].title}</p>
                                <div className="arrow"></div>
                            </div>
                            {
                                activePageParent === parent ? (
                                <motion.div className="subNavsContainer"
                                initial={{height: "0px"}}
                                animate={{height: "auto"}}
                                exit={{height: 0}}>
                                    {
                                    Object.keys(props.taskSettings[parent].components).map((value) => {
                                        return (
                                            <div key={value} className={`${value} navChild subChild`} onClick={changeActivePage}>
                                                <p>{props.taskSettings[parent].components[value].title}</p>
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