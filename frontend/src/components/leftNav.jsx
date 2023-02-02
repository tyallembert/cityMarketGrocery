import { useEffect, useState } from "react";
import "./leftNav.scss";
import {motion} from 'framer-motion';

function LeftNav(props) {
    const [activePage, setActivePage] = useState(["liveFreight"]);
    const [taskSettings, setTaskSettings] = useState(props.taskSettings);
    useEffect(() => {
        setTaskSettings(props.taskSettings);
    }, [])
    useEffect(() => {
        setTaskSettings(props.taskSettings);
    }, [activePage, taskSettings])

    const changeActivePage = (e) => {
        var page = e.currentTarget.className.split(" ");
        //if
        var parentType = "";
        var tempActive = [];
        if(page[2] === "subChild"){
            parentType = e.currentTarget.parentNode.parentNode.className.split(" ")[0];
            tempActive.push(parentType);
            tempActive.push(page[0])
        }else{
            tempActive.push(page[0])
        }

        if(tempActive.length == 2){
            if(activePage.length == 2){
                //the old active is a subchild 
                //the new active is a subchild 
                taskSettings[activePage[0]].components[activePage[1]].classes = taskSettings[activePage[0]].components[activePage[1]].classes.replace('activePage','');
                taskSettings[parentType].components[page[0]].classes = taskSettings[parentType].components[page[0]].classes + " activePage";
            }else{
                //the old active is a paretask
                //the new active is a subchild 
                taskSettings[activePage[0]].classes = taskSettings[activePage[0]].classes.replace('activePage','');
                taskSettings[parentType].components[page[0]].classes = taskSettings[parentType].components[page[0]].classes + " activePage";
            }
        }else{
            if(activePage.length == 2){
                //the old active is a subchild 
                //the new active is a parent 
                taskSettings[activePage[0]].components[activePage[1]].classes = taskSettings[activePage[0]].components[activePage[1]].classes.replace('activePage','');
                taskSettings[page[0]].classes = taskSettings[page[0]].classes + " activePage";
            }else{
                //the old active is a parent 
                //the new active is a parent 
                taskSettings[activePage[0]].classes = taskSettings[activePage[0]].classes.replace('activePage','');
                taskSettings[page[0]].classes = taskSettings[page[0]].classes + " activePage";
            }
        }

        setActivePage(tempActive);
        props.updateActivePage({activePage: page[0], parent: parentType});
    };
    return (
        <div className="leftNavContainer">
            {
                Object.keys(taskSettings).map((outer) => {
                    return(
                        <div key={outer} className={taskSettings[outer].classes}>
                            <div className={taskSettings[outer].classes.split(" ")[0] + " mainNavButton"} onClick={changeActivePage}>
                                <p>{taskSettings[outer].title}</p>
                                <div className="arrow"></div>
                            </div>
                            {
                                activePage[0] === outer ? (
                                <motion.div className="subNavsContainer"
                                initial={{height: "0px"}}
                                animate={{height: "auto"}}
                                exit={{height: 0}}>
                                    {
                                    Object.keys(taskSettings[outer].components).map((value) => {
                                        return (
                                            <div key={value} className={taskSettings[outer].components[value].classes} onClick={changeActivePage}>
                                                <p>{taskSettings[outer].components[value].title}</p>
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