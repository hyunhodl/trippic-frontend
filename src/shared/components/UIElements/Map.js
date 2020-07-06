import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
    const mapRef = useRef();

    const {
        center: { lat, lng },
        zoom,
    } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: {
                lat: +lat,
                lng: +lng,
            },
            zoom: zoom,
        });

        new window.google.maps.Marker({
            position: { lat: +lat, lng: +lng },
            map: map,
        });
    }, [lat, lng, zoom]);

    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );
};

export default Map;
