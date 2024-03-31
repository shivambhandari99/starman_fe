import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, KmlLayer } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = { lat: -34.397, lng: 150.644 };

const MapComponent = () => {
    const [currentPosition, setCurrentPosition] = useState({});
    const [opacity, setOpacity] = useState(1);

    const success = position => {
        setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    const handleOpacityChange = (e) => {
        const newOpacity = parseFloat(e.target.value);
        setOpacity(newOpacity);
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition.lat ? currentPosition : center}
                zoom={10}
            >
                <KmlLayer
                    url="https://my-kml-files.s3.us-east-2.amazonaws.com/california.kmz"
                    options={{
                        preserveViewport: false,
                        suppressInfoWindows: false,
                    }}
                />

                <div style={{ position: 'absolute', left: '10px', top: '10px', zIndex: 5 }}>
                    <label>
                        Opacity:
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={opacity}
                            onChange={handleOpacityChange}
                        />
                    </label>
                </div>

            </GoogleMap>
        </LoadScript>
    )
}

export default MapComponent;
