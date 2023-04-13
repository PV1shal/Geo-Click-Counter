import { useEffect, useState } from "react";
import GeoLocation from "../Services/GeoLocation";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./GeoClicks.css";


const GeoClicks = () => {

    const [locClicks, setlocClicks] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    var totalClicks = 0;

    useEffect(() => {
        GeoLocation.getAllLocations().then((response) => {
            console.log(response.data.locations);
            setlocClicks(response.data.locations);
        });
    }, []);

    const handleMarkerClick = (clicks) => {
        setSelectedMarker(clicks);
    };

    const handleCloseModal = () => {
        setSelectedMarker(null);
    };

    return (
        <div style={{ height: "95vh" }}>

            <a title="Back to Home Page" href="/" style={{ position: "absolute", color: "black" }}>
                <ArrowBackIcon fontSize="large" className="back-button" />
            </a>

            <div style={{ overflow: "hidden", height: "100%" }}>
                <ComposableMap style={{ cursor: "grab", background: "rgb(156, 192, 249)", height: "100%" }}>
                    <ZoomableGroup>
                        <Geographies geography="/features.json">
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography key={geo.rsmKey} geography={geo} />
                                ))
                            }
                        </Geographies>
                        {Object.entries(locClicks).map(([keys, values]) => {
                            { totalClicks += values.clicks }
                            return (
                                <Marker coordinates={[values.long, values.lat]}
                                    onClick={() => handleMarkerClick(values.clicks)}>
                                    <circle r={4} fill="#F53" />
                                </Marker>
                            );
                        })}
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {selectedMarker && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p className="value">Number of clicks: {selectedMarker}</p>
                    </div>
                </div>
            )}
            <div style={{
                background: "rgb(26, 26, 29)",
                height: "5vh",
                textAlign: "center",
                fontSize: "21px",
                color: "white",
                fontWeight: "600"
            }}>
                Total Clicks: {totalClicks} <br />
                Click on the dots to view Individual clicks
            </div>
        </div>
    );
}

export default GeoClicks;