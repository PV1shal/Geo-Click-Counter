import { useEffect, useState } from "react";
import GeoLocation from "../Services/GeoLocation";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./GeoClicks.css";


const GeoClicks = () => {

    const [locClicks, setlocClicks] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

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
        <div style={{ height: "100vh" }}>

            <a title="Back to Home Page" href="/">
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
        </div>
    );
}

export default GeoClicks;