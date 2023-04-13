import React, { useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import './counter.css'
import GeoLocation from "../Services/GeoLocation";
// import GeoLocation from "../Services/GeoLocation";

const Counter = () => {

    const [clicks, setClicks] = useState(JSON.parse(window.localStorage.getItem('clickCounts')) || 0);

    const saveToDB = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            var data = {
                "locClick": {
                    "lat": Math.trunc(position.coords.latitude * 100) / 100,
                    "long": Math.trunc(position.coords.longitude * 100) / 100,
                    "clicks": 1
                }
            };
            GeoLocation
                .postLocationClicks(data)
                .then((response) => {
                    console.log(response.data);
                });
        });
    }

    const clickedButton = () => {
        setClicks(clicks + 1);
        window.localStorage.setItem('clickCounts', clicks + 1);
        saveToDB();
    }

    return (
        <>
            <a href="/geoCount" class="geoButton">
                <span class="geoIcon"><TravelExploreIcon /></span>
                <span class="geoText">Geographic Distribution</span>
            </a>
            <div className="Clicks">
                <div className="click-Count">
                    {clicks}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button className="countButton" onClick={clickedButton}>
                        +
                    </button>
                    <button className="countButton" onClick={() => {
                        setClicks(0);
                        window.localStorage.setItem('clickCounts', 0);
                        saveToDB();
                    }}>
                        <RefreshIcon fontSize="large" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Counter;