import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './index.css';
import React from "react";



function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}

function MyMapComponent() {
    return (
        <MapContainer center={[24, 46]} zoom={5} scrollWheelZoom={false}>
            <MyComponent />
            <TileLayer
                attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )
}

export default MyMapComponent;
