import React, { useState, useEffect } from "react";
import "../../styles/shrinkLog.scss";
import { GiBrokenBottle } from "react-icons/gi";

type Props = {
    employees: any
}
const ShrinkLog: React.FC<Props> = (props) => {
    const [activeLog, setActiveLog] = useState("dryGoodsLog");
    const [showingPopup, setShowingPopup] = useState(false);
    const [showingNewShrink, setShowingNewShrink] = useState(false);
    const [employees, setEmployees] = useState(props.employees);
    const [employeeOptionObjects, setEmployeeOptionObjects] = useState([]);
    const [shrinkedItems, setShrinkedItems] = useState({
        dryGoods: {
            "kbdifgbs": {
                name: "Peanut Butter",
                UPC: "123456789",
                size: "16oz",
                date: "2021-01-01",
                quantity: 1,
                employee: "Ty"
            },
            "iuiwome": {
                name: "Crackers",
                UPC: "123456789",
                size: "1gal",
                date: "2021-01-01",
                quantity: 1,
                employee: "Ty"
            },
            "iuiome": {
                name: "Mayonaise",
                UPC: "123456789",
                size: "32oz",
                date: "2021-01-01",
                quantity: 1,
                employee: "Ty"
            }
            
        },
        perishables: {
            "kbdifgbs": {
                name: "Milk",
                UPC: "123456789",
                size: "16oz",
                date: "2021-01-01",
                quantity: 1,
                employee: "Ty"
            }
        }
    });

    useEffect(() => {
        setEmployees(props.employees);
        createEmployeeOptions();
    }, [props.employees])
    useEffect(() => {
        getShrinkedItems();
    }, [])
    const getShrinkedItems = () => {
        // fetch items from backend
    }
    const togglePopup = () => {
        setShowingPopup(!showingPopup);
    }
    const handleChange = () => {
        // handle change
    }
    const toggleActiveLog = (e) => {
        setActiveLog(e.target.className.split(" ")[0]);
    }
    const populateShrinkedItems = (type) => {
        var items = [];
        for (var item in shrinkedItems[type]) {
            items.push(
                <div className="shrinkedItemContainer" key={item}>
                    <p className="shrinkItemParam shrinkedItemName">{shrinkedItems[type][item].name}</p>
                    <p className="shrinkItemParam shrinkedItemUPC">{shrinkedItems[type][item].UPC}</p>
                    <p className="shrinkItemParam shrinkedItemSize">{shrinkedItems[type][item].size}</p>
                    <p className="shrinkItemParam shrinkedItemDate">{shrinkedItems[type][item].date}</p>
                    <p className="shrinkItemParam shrinkedItemQuantity">{shrinkedItems[type][item].quantity}</p>
                    <p className="shrinkItemParam shrinkedItemEmployee">{shrinkedItems[type][item].employee}</p>
                </div>
            )
        }
        return items;
    }
    const createEmployeeOptions = () => {
        var tempObjects = [];
        tempObjects.push(<option key={0} value="choose">Choose</option>);
        for(var id in employees){
            var firstLastInit = employees[id].firstName + " "+ employees[id].lastName[0];
            tempObjects.push(
                <option key={id} value={firstLastInit}>{firstLastInit}</option>
            )
        }
        setEmployeeOptionObjects(tempObjects);
    }
    return (
        <div className="shrinkLogContainer">
            <button className="shrinkButton" onClick={togglePopup}>
                <GiBrokenBottle />
            </button>
            {
                showingPopup ? (
                    <>
                    <div className="blackBackground" onClick={() => {setShowingPopup(false)}}></div>
                    <div className="shrinkLogPopup">
                        <h1 className="mainTitle">Shrink Log</h1>
                        {
                            showingNewShrink ? (
                                <div className="newShrinkContainer">
                                    <label className="typeLabel">
                                        Type:
                                        <select className="typeInput" name="type" onChange={handleChange}>
                                            <option value="dryGoods">Dry Goods</option>
                                            <option value="perishables">Perishables</option>
                                        </select>
                                    </label>
                                    <label className="upcLabel">
                                        UPC:
                                        <input className="upcInput" type="text" name="upc" onChange={handleChange} />
                                    </label>
                                    <label className="sizeLabel">
                                        Size:
                                        <input className="sizeInput" type="text" name="size" onChange={handleChange} />
                                    </label>
                                    <label className="quantityLabel">
                                        Quantity:
                                        <input className="quantityInput" type="text" name="quantity" onChange={handleChange} />
                                    </label>
                                    <label className="nameLabel">
                                        Name:
                                        <select className="nameInput" name="name" onChange={handleChange}>
                                            {employeeOptionObjects}
                                        </select>
                                    </label>
                                    <button className="button" onClick={() => {setShowingNewShrink(false)}}>Save</button>
                                    <button className="button" onClick={() => {setShowingNewShrink(false)}}>Cancel</button>
                                </div>
                            ): (
                                <div className="newItemButton">
                                    <button className="button" onClick={() => {setShowingNewShrink(true)}}>New Item +</button>
                                </div>
                            )
                        }
                        <div className="headersContainer">
                            <button className={activeLog === "dryGoodsLog" ? "dryGoodsLog activeButton": "dryGoodsLog"} onClick={toggleActiveLog}>Dry Goods</button>
                            <button className={activeLog === "perishablesLog" ? "perishablesLog activeButton": "perishablesLog"} onClick={toggleActiveLog}>Perishables</button>
                        </div>
                        {
                            activeLog === "dryGoodsLog" ? (
                                <div className="infoContainer dryGoodsContainer">
                                    {populateShrinkedItems("dryGoods")}
                                </div>
                            ): (
                                <div className="infoContainer perishablesContainer">
                                    {populateShrinkedItems("perishables")}
                                </div>
                            )
                        }
                        <button className="button" onClick={togglePopup}>Cancel</button>
                    </div>
                    </>
                ) : null
            }
        </div>
    )
}

export default ShrinkLog