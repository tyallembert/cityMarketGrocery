// import React, { useEffect, useState, useCallback } from "react";
// import "../../styles/toDo.scss";
// import {BsCardChecklist} from 'react-icons/bs';
// import { Employee, Tasks, forEachTask } from "../../types";
// import TaskObject from "../afterLiveComponents/TaskObject";

// type Props = {
//     tasks: Tasks,
//     taskSettings: any,
//     updateTasks: any,
//     employees: {[key: string]: Employee},
//     activePage: string,
//     activePageParent: string
// }
// const ToDo: React.FC<Props> = (props) => {
//     const [showing, setShowing] = useState(false);
//     const [showingNewPopup, setShowingNewPopup] = useState(false);
//     const [tasks] = useState(props.tasks);
//     const [numToDo, setNumToDo] = useState(0);

//     const countToDos = useCallback(() => {
//         var count = 0;
//         forEachTask(tasks, (categoryTasks) => {
//             forEachTask(categoryTasks, (typeTasks) => {
//                 forEachTask(typeTasks, (task) => {
//                     try{
//                         if (task.status === "To Do"){
//                             count++;
//                         }
//                     }catch(err){
//                         console.log(err);
//                     }
//                 })
//             })
//         })
//         // Object.keys(tasks).forEach((key: keyof Tasks) => {
//         //     Object.keys(tasks[key]).forEach((key2: string) => {
//         //         Object.keys(tasks[key][key2]).forEach((key3: string) => {
//         //             if (tasks[key][key2][key3].status === "To Do"){
//         //                 count++;
//         //             }
//         //         })
//         //     })
//         // })
//         setNumToDo(count);
//     }, [tasks])

//     useEffect(() => {
//         countToDos();
//     }, [countToDos])

//     const newTaskStarted = (res:any) => {
//         setShowing(false);
//         props.updateTasks(res.task, res.id, res.parentType, res.type);
//     }
    
//     return(
//         <div className={showing ? "toDoContainer showing": "toDoContainer hidden"}>
//             <button className="toggleButton" onClick={() => setShowing(!showing)}>
//                 <BsCardChecklist/>
//                 <p className="notification">{numToDo}</p>
//             </button>
//             {
//                 showing ? (
//                     <>
//                         <div className="topButtons">
//                             <button className="newTaskButton" onClick={() => setShowingNewPopup(!showingNewPopup)}>
//                                 New Task
//                             </button>
//                             <button className="editTasksButton">
//                                 Edit
//                             </button>
//                         </div>
//                         <div className="currentToDoContainer">
//                             {
//                                 Object.keys(tasks).map((key: string) => {
//                                     return(
//                                         Object.keys(tasks[key]).map((key2: string) => {
//                                             return(
//                                                 Object.keys(tasks[key][key2]).map((key3: string) => {
//                                                     if (tasks[key][key2][key3].status === "To Do"){
//                                                         var theTask = tasks[key][key2][key3];
//                                                         return (
//                                                             <TaskObject newTaskStarted={newTaskStarted} 
//                                                                 updateTasks={props.updateTasks}
//                                                                 task={theTask}
//                                                                 parentType={key}
//                                                                 type={key2}
//                                                                 employees={props.employees} 
//                                                                 taskSettings={props.taskSettings}
//                                                                 id={key3}
//                                                                 key={key3}/>  
//                                                         )
//                                                     }
//                                                 })
//                                             )
//                                         })
//                                     )
//                                 })
//                             }
//                         </div>
//                     </>
//                 ): null
//             }
//         </div>
//     )
// }
// export default ToDo;