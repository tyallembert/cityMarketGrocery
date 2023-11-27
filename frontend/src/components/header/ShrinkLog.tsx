import React, { useState, useEffect } from "react";
import "../../styles/shrinkLog.scss";
import { GiBrokenBottle } from "react-icons/gi";
import { ShrinkItem } from "../../types";
import EmployeeSelect from "../EmployeeSelect";
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";

type Props = {
    employees: any
}
const ShrinkLog: React.FC<Props> = (props) => {
    const [activeLog, setActiveLog] = useState("dryGoodsLog");
    const [showingPopup, setShowingPopup] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        getShrinkedItems();
    }, [])
    useEffect(() => {
        if(!animating) {
            setTimeout(() => {
                setShowingPopup(false);
            }, 300);
        }else {
            setShowingPopup(true);
        }
    }, [animating])

    const getShrinkedItems = () => {
        // fetch items from backend
    }
    const togglePopup = () => {
        setAnimating(!animating);
    }
    const handleChange = () => {
        // handle change
    }
    return (
        <div className="shrinkLogContainer">
            <button className="shrinkButton" onClick={togglePopup}>
                <GiBrokenBottle />
            </button>
            {
                showingPopup ? (
                    <>
                    <div className="blackBackground" onClick={togglePopup}></div>
                    <div className={animating ? "shrinkLogPopup animateIn": "shrinkLogPopup animateOut"}>
                        <h1 className="mainTitle">Shrink Log</h1>
                        <div className="newShrinkContainer">
                            <label className="typeLabel">
                                Type:
                                <select className="typeInput" name="type" onChange={handleChange}>
                                    <option value="dryGoods">Dry Goods</option>
                                    <option value="perishables">Perishables</option>
                                    <option value="perishables">Frozen</option>
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
                                <EmployeeSelect onSelect={handleChange} employees={props.employees}/>
                            </label>

                            <div className="buttonContainer">
                                <button className="button save" onClick={togglePopup}>
                                    <IoCheckmarkDoneSharp />
                                </button>
                                <button className='button cancel' onClick={togglePopup}>
                                    <IoCloseSharp />
                                </button>
                            </div>
                        </div>
                    </div>
                    </>
                ) : null
            }
        </div>
    )
}

export default ShrinkLog