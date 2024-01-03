import {MapContainer, TileLayer, Marker, Popup, useMap, Rectangle, FeatureGroup} from "react-leaflet";
import L, {polygon} from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import './index.css';
import React, {useEffect, useMemo} from "react";
import {Grid, GridTarget} from "./grid-manager";
import {useState} from "react";
import {BrowserRouter, Router, useSearchParams} from "react-router-dom";
import {EditControl} from "react-leaflet-draw";
import Form from "./Form";
import {Flex} from "antd";


function MyComponent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [lastGeoHash, setLastGeoHash] = useState<string>(searchParams.get("geohash") || "")
    const map = useMap()
    let gridManager = new Grid(map, [[90, -180], [-90, 180]], (target: GridTarget) => {
        setSearchParams({geohash: target.geohash})
    })

    useEffect(() => {
        const currentGeohash = searchParams.get("geohash") || ""

        map.eachLayer(function (layer) {
            // @ts-ignore
            if (layer instanceof L.Polygon && layer['_geohash'] == null) {
                console.log(layer)
                const bounds = layer.getBounds()
                layer.bindPopup(`east: ${bounds.getEast()}<br>west: ${bounds.getWest()}<br>north: ${bounds.getNorth()}<br>south: ${bounds.getSouth()}`).openPopup()
                layer.setStyle({color: 'green'})
            }
        })


        if (currentGeohash != lastGeoHash) {
            map.eachLayer(function (layer) {
                if (layer instanceof L.Rectangle) {
                    map.removeLayer(layer)
                }
            })
        }

        if (currentGeohash.length > 4)
            return

        let targetArea = gridManager.displayGrid(currentGeohash.toLowerCase().trim())


        const [[startLat, startLng], [endLat, endLng]] = targetArea
        let area = {start: {lat: startLat, lng: startLng}, end: {lat: endLat, lng: endLng}}

        const mapNorthWest = map.getBounds().getNorthWest()
        const mapSouthEast = map.getBounds().getSouthEast()

        const updateNorthWest = area.start.lat != mapNorthWest.lat || area.start.lng != mapNorthWest.lng
        const updateSouthEast = area.end.lat != mapSouthEast.lat || area.end.lng != mapSouthEast.lng

        if (updateNorthWest || updateSouthEast) {
            map.fitBounds([[area.start.lat, area.start.lng], [area.end.lat, area.end.lng]])
        }

        gridManager.displayTemp(currentGeohash.toLowerCase().trim())

        setLastGeoHash(currentGeohash)
    }, [searchParams]);


    // map.on('click', function (e) {
    //     map.eachLayer(function (layer) {
    //         if (layer instanceof L.Circle) {
    //             map.removeLayer(layer)
    //         }
    //     })
    //     const circle = L.circle(e.latlng, { radius: 20 }).addTo(map)
    //     circle.bindPopup(`lat: ${e.latlng.lat}<br>lon: ${e.latlng.lng}`).openPopup()
    // })


    map.removeControl(map['attributionControl'])


    return null
}

function MyMapComponent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const _created = (e: any) => {
        let numDrawings = parseInt(searchParams.get("numDrawings") || "0")
        numDrawings += 1
        setSearchParams(
            {
                numDrawings: numDrawings.toString(),
                geohash: searchParams.get("geohash") || "",
            }
        )
    }

    return (
        <Flex vertical={true} justify="center">
            <div

            >
                <Form />
                </div>
            <MapContainer center={[24, 46]} zoom={10} scrollWheelZoom={false}>
                <MyComponent/>
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={_created}
                        draw={
                            {
                                rectangle: false,
                                polyline: false,
                                circle: false,
                                circlemarker: false,
                                marker: false,
                                polygon: true,
                            }
                        }


                    />
                </FeatureGroup>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

            </MapContainer>
        </Flex>
    )
}

export default MyMapComponent;
