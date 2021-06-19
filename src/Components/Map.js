import React, { useCallback, useEffect, useRef, useState } from 'react'
import { loadModules } from 'esri-loader';
import Widgets from './Widgets';
const Map = () => {

    const [view, setView] = useState(null);
    useEffect(() => {
        console.log("View", view);
    }, [view])
    const mapRef = useRef();

    // Widgets Refs...
    const searchRef = useRef();
    const daylightRef = useRef();
    const basemapRef = useRef();
    const distanceRef = useRef();
    const areaRef = useRef();
    const layersRef = useRef();
    const legendsRef = useRef();
    const fullScreenRef = useRef();

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

                // Widget 1 Search Widget

                var searchWidget = new Search({
                    container: searchRef.current,
                    view: view
                });

                // // Add the search widget to the top right corner of the view
                // view.ui.add(searchWidget, {
                //     position: "top-right"
                // });

                // Widget 2 Distance Widget
                var distanceWidget = new DirectLineMeasurement3D({
                    container: distanceRef.current,
                    view: view
                });

                //   // skip the initial 'new measurement' button
                // distanceWidget.viewModel.start();
                // view.ui.add(distanceWidget, "top-right");

                // Widget 3 Area Widget
                var areaWidget = new AreaMeasurement3D({
                    container: areaRef.current,
                    view: view
                });

                // // skip the initial 'new measurement' button
                // areaWidget.viewModel.start();
                // view.ui.add(areaWidget, "top-right");

                // Widget 4 Layers Widget

                var basemapGallery = new BasemapGallery({
                    container: basemapRef.current,
                    view: view
                });

                // Add the widget to the top-right corner of the view
                // view.ui.add(basemapGallery, {
                //     position: "top-right"
                // });

                // Widget 5 Layers Widget

                const daylightWidget = new Daylight({
                    container: daylightRef.current,
                    view: view,
                    // plays the animation twice as fast than the default one
                    playSpeedMultiplier: 2,
                    // disable the timezone selection button
                    visibleElements: {
                        timezone: false
                    }
                });
                // view.ui.add(daylightWidget, "top-right");

                // Widget 6 Legends 
                // var featureLayer = view.layers.getItemAt(0);

                // var legend = new Legend({
                //     view: view,
                //     // layerInfos: [
                //     //     {
                //     //         layer: featureLayer,
                //     //         title: "NY Educational Attainment"
                //     //     }
                //     // ]
                // });
                // view.ui.add(legend, "top-right");

                // Widget 7 Layers Widget

                var layerList = new LayerList({
                    container: layersRef.current,
                    view: view,
                    listItemCreatedFunction: function (event) {
                        const item = event.item;
                        if (item.layer.type != "group") {
                            // don't show legend twice
                            item.panel = {
                                content: "legend",
                                open: true
                            };
                        }
                    }
                });

                // // Add widget to the top right corner of the view
                // view.ui.add(layerList, "top-right");

                // Widget 8 Legends..

                var legend = new Legend({
                    container: legendsRef.current,
                    view: view,
                    style: "card" // other styles include 'classic'
                });
                // view.ui.add(legend, "bottom-left");

                // Widget 9 FullScreen
                var fullscreen = new Fullscreen({
                    // container: fullScreenRef.current,
                    view: view,
                    // id: "full-widget",
                    // declaredClass: "full-screen-custom"
                });
                view.ui.add(fullscreen, "bottom-right");


                ///// Slides Code...
                // view.ui.add(["createSlideDiv", "slidesDiv"], "top-right");

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

    useEffect(() => {
        console.log("View:", view)
    }, [view])

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
                fullScreenRef={fullScreenRef}
            />
            <div style={{ height: "100vh", width: "100vw" }} className="topo-map" ref={mapRef}>
            </div>
        </div>
    )
}

export default Map
