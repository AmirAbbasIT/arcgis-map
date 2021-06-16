import React, { useCallback, useEffect, useRef } from 'react'
import { loadModules } from 'esri-loader';
const Map = () => {

    const mapRef = useRef();

    useEffect(() => {
        loadModules([
            "esri/config",
            "esri/Map",
            "esri/views/SceneView",], { css: true })
            .then(([esriConfig, Map, SceneView]) => {
                esriConfig.apiKey = "AAPK9c7f8c1db2274a55ac08483ae7df46a7AmG6j3sj2BPjdDShFCXB9gm4R2ijnCHLPww42eJSwQF46AbjrD1rR6GJS98-uRqs";

                const map = new Map({
                    basemap: "arcgis-topographic", //Basemap layer service
                    ground: "world-elevation", //Elevation service
                });

                const view = new SceneView({
                    container: mapRef.current,
                    map: map,
                    camera: {
                        position: {
                            x: -118.808, //Longitude
                            y: 33.961, //Latitude
                            z: 2000 //Meters
                        },
                        tilt: 75
                    }
                });

            })
    }, [])

    return (
        <div>
            <div style={{ height: "100vh", width: "100vw" }} className="topo-map" ref={mapRef}>

            </div>
        </div>
    )
}

export default Map
