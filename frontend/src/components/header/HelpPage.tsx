import React, { useState } from 'react'
import "../../styles/helpPage.scss";

type Props = {

}
const HelpPage: React.FC<Props> = () => {
    const [showingPopup, setShowingPopup] = useState<boolean>(false);

    const togglePopup = () => {
        setShowingPopup(!showingPopup);
    }
    return (
        <div className="helpPageContainer">
            <button className="helpButton" onClick={togglePopup}>
                ?
            </button>
            {
                showingPopup ? (
                    <div className="helpPopup">
                        <div className='headerContainer'>
                            <h1>Help</h1>
                            <button className="shrinkButton" onClick={togglePopup}>
                                cancel
                            </button>
                        </div>
                        <div className='FAQContainer'>
                            <h2>FAQ</h2>
                        </div>
                        <div className='tutorialContainer'>
                            <h2>Tutorial</h2>
                        </div>
                        <div className='storeMapContainer'>
                            <h2>Store Map</h2>
                        </div>
                    </div>
                    ): null
            }
        </div>
    )
}

export default HelpPage
