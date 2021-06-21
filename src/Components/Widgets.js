import React, { useState, useRef, useEffect } from 'react'

const Widgets = ({ searchRef, basemapRef, daylightRef, distanceRef, areaRef, layersRef, legendsRef, fullScreenRef }) => {

    const [selectedWidget, setSelectedWidget] = useState("")
    const [fullScreen, setFullScreen] = useState(false);
    const [activeSidebar, setActiveSidebar] = useState(false);
    const changeWidget = (widget) => {
        if (widget === selectedWidget)
            return setSelectedWidget("")
        else {
            switch (widget) {
                case "distance":
                    return setSelectedWidget("distance");
                case "area":
                    return setSelectedWidget("area");
                case "daylight":
                    return setSelectedWidget("daylight");
                case "basemap":
                    return setSelectedWidget("basemap");
                case "slides":
                    return setSelectedWidget("slides");
                case "layers":
                    return setSelectedWidget("layers");
                case "legends":
                    return setSelectedWidget("legends");
                default:
                    return;
            }
        }

    }

    // const [widget, setWidget] = useState(null);

    // useEffect(() => {
    //     console.log("huhuhuh", daylightRef, basemapRef)
    //     switch (selectedWidget) {
    //         case "daylight":
    //             return setWidget(widget => daylightRef.current);
    //         case "basemap":
    //             return setWidget(widget => basemapRef.current);
    //     }
    //     // widget.current = daylightRef;
    // }, [selectedWidget])

    // useEffect(() => {
    //     console.log(daylightRef, basemapRef)
    // }, [daylightRef, basemapRef])
    // const getWidget = () => { }
    return (
        <div>
            <div className={`top-bar ${fullScreen ? "hide-top" : ""}`}>
                <p>Asset Management</p>
            </div>

            <div className="sidebar">
                <div>
                    <div className={`sidebar-content ${!activeSidebar ? "inactive-sidebar" : ""}`}>
                        <div className="filter-icon" onClick={() => setActiveSidebar(!activeSidebar)}>
                            <div className="filter-icon-wrapper">
                                <img src="/assets/chart-pie.svg" alt="not found" />
                            </div>
                            <div className="filter-icon-wrapper">
                                <img src="/assets/table.svg" alt="not found" />
                            </div>
                        </div>
                        <div className={`content`}>
                            <div className={`content-header ${!activeSidebar ? "inactive-header" : ""}`}>
                                <p>Charts</p>
                                <div className="close-icon" onClick={() => setActiveSidebar(false)}>
                                    <img src="/assets/metro-cross.svg" alt="not found" />
                                </div>
                            </div>
                            <div className={`content-body`}>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`widget-section ${selectedWidget ? "active" : "inactive"}`} >
                <div className={`${selectedWidget == "area" ? "active esri-area-measurement-3d__container" : "inactive"}`} ref={areaRef}>
                </div>
                <div className={`${selectedWidget == "distance" ? "active esri-direct-line-measurement-3d__container" : "inactive"}`} ref={distanceRef}>
                </div>
                <div className={`${selectedWidget == "daylight" ? "active esri-daylight esri-widget" : "inactive"}`} ref={daylightRef}>
                </div>
                <div className={`basemap-gallery-custom ${selectedWidget == "basemap" ? "active" : "inactive"}`} ref={basemapRef}>
                </div>
                <div className={`${selectedWidget == "layers" ? "active" : "inactive"}`} ref={layersRef}>
                </div>
                <div className={`${selectedWidget == "legends" ? "active" : "inactive"}`} ref={legendsRef}>
                </div>
                <div className={`${selectedWidget == "slides" ? "active" : "inactive"}`} >
                    <div id="createSlideDiv" class="esri-widget">
                        New slide: <input type="text" id="createSlideTitleInput" size="10" />
                        <button id="createSlideButton">Create</button>
                    </div>
                    <div id="slidesDiv" class="esri-widget"></div>
                </div>
            </div>

            <div className={`bottom-bar ${fullScreen ? "hide-bottom" : ""}`} >
                <div className="search-bar" ref={searchRef}>
                </div>

                <div className="widgets-container">
                    <div className="widget-icon">
                        <span className={selectedWidget == "distance" ? "selected" : ""} onClick={() => changeWidget("distance")}>
                            <img src={'/assets/ruler-horizontal.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget == "area" ? "selected" : ""} onClick={() => changeWidget("area")}>
                            <img src={'/assets/ruler-combined.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget == "basemap" ? "selected" : ""} onClick={() => changeWidget("basemap")}>
                            <img src={'/assets/metro-map.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget == "slides" ? "selected" : ""} onClick={() => changeWidget("slides")}>
                            <img src={'/assets/slideshow.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget == "daylight" ? "selected" : ""} onClick={() => changeWidget("daylight")}>
                            <img src={'/assets/lightbulb.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget == "layers" ? "selected" : ""} onClick={() => changeWidget("layers")}>
                            <img src={'/assets/layer-group.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget == "legends" ? "selected" : ""} onClick={() => changeWidget("legends")}>
                            <img src={'/assets/list.svg'} alt="notFound" />
                        </span>
                    </div>
                </div>

                {/* <span className="full-screen-icon" onClick={() => setFullScreen(!fullScreen)}>
                    <img src={'/assets/fullscreen_button.svg'} alt="notFound" />
                </span> */}
            </div>
            <span
                className="full-screen-icon"
                //  onClick={() => setFullScreen(!fullScreen)}
                ref={fullScreenRef}
            >
                {/* <img src={'/assets/fullscreen_button.svg'} alt="notFound" /> */}
            </span>
        </div>
    )
}

export default Widgets
