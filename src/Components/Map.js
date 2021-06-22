import React, { useEffect, useRef } from 'react'
import { loadModules } from 'esri-loader';
import Widgets from './Widgets';
import { loadWidget, createSlideUI } from '../Utils/widgets';
const Map = () => {

    const mapRef = useRef();

    // Widgets Refs...
    const searchRef = useRef();
    const daylightRef = useRef();
    const basemapRef = useRef();
    const distanceRef = useRef();
    const areaRef = useRef();
    const layersRef = useRef();
    const legendsRef = useRef();


    //
    useEffect(() => {
        loadModules([
            "esri/config",
            "esri/Map",
            "esri/views/SceneView",
            "esri/widgets/Search",
            "esri/widgets/DirectLineMeasurement3D",
            "esri/widgets/AreaMeasurement3D",
            "esri/widgets/BasemapGallery",
            "esri/widgets/Daylight",
            "esri/widgets/LayerList",
            "esri/widgets/Legend",
            "esri/widgets/Fullscreen",
            "esri/webscene/Slide"
        ], { css: true })
            .then(([
                esriConfig,
                Map,
                SceneView,
                Search,
                DirectLineMeasurement3D,
                AreaMeasurement3D,
                BasemapGallery,
                Daylight,
                LayerList,
                Legend,
                Fullscreen,
                Slide
            ]) => {

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


                loadWidget(Search, view, searchRef)

                loadWidget(DirectLineMeasurement3D, view, distanceRef)

                loadWidget(AreaMeasurement3D, view, areaRef)

                loadWidget(BasemapGallery, view, basemapRef)

                loadWidget(Daylight, view, daylightRef, {
                    playSpeedMultiplier: 2,
                    visibleElements: {
                        timezone: false
                    }
                })

                loadWidget(LayerList, view, layersRef, {
                    listItemCreatedFunction: function (event) {
                        const item = event.item;
                        if (item.layer.type !== "group") {
                            item.panel = {
                                content: "legend",
                                open: true
                            };
                        }
                    }
                })

                loadWidget(Legend, view, legendsRef, { style: "card" })

                // Widget 9 FullScreen
                var fullscreen = new Fullscreen({
                    view: view,
                });
                view.ui.add(fullscreen, "bottom-right");


                // Slides Widget
                function createSlideUI(slide, placement) {
                    var slideElement = document.createElement("div");
                    slideElement.id = slide.id;
                    slideElement.classList.add("slide");
                    var slidesDiv = document.getElementById("slidesDiv");
                    if (placement === "first") {
                        slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
                    } else {
                        slidesDiv.appendChild(slideElement);
                    }

                    var title = document.createElement("div");
                    title.innerText = slide.title.text;
                    slideElement.appendChild(title);

                    var img = new Image();
                    img.src = slide.thumbnail.url;
                    img.title = slide.title.text;
                    slideElement.appendChild(img);
                    slideElement.addEventListener("click", function () {
                        var slides = document.querySelectorAll(".slide");
                        Array.from(slides).forEach(function (node) {
                            node.classList.remove("active");
                        });
                        slideElement.classList.add("active");
                        slide.applyTo(view);
                    });
                }
                ///
                document.getElementById("slidesDiv").style.visibility = "visible";
                var slides = view.presentation?.slides;
                slides?.forEach(createSlideUI);
                document.getElementById("createSlideButton").addEventListener("click", function () {
                    Slide.createFrom(view).then(function (slide) {
                        slide.title.text = document.getElementById("createSlideTitleInput").value;
                        view.presentation?.slides?.add(slide);

                        createSlideUI(slide, "first");
                    });
                });

            })
    }, [])



    return (
        <div>
            <Widgets
                searchRef={searchRef}
                basemapRef={basemapRef}
                daylightRef={daylightRef}
                distanceRef={distanceRef}
                areaRef={areaRef}
                layersRef={layersRef}
                legendsRef={legendsRef}
            />
            <div style={{ height: "100vh", width: "100vw" }} className="topo-map" ref={mapRef}>
            </div>
        </div>
    )
}

export default Map
