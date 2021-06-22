import React, { useState } from 'react'
import Sidebar from './Sidebar'

const Widgets = ({ searchRef, basemapRef, daylightRef, distanceRef, areaRef, layersRef, legendsRef }) => {

    const [selectedWidget, setSelectedWidget] = useState("")

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

    return (
        <div>
            <div className={`top-bar`}>
                <p>Asset Management</p>
            </div>

            <Sidebar />

            <div className={`widget-section ${selectedWidget ? "active" : "inactive"}`} >
                <div className={`${selectedWidget === "area" ? "active esri-area-measurement-3d__container" : "inactive"}`} ref={areaRef}>
                </div>
                <div className={`${selectedWidget === "distance" ? "active esri-direct-line-measurement-3d__container" : "inactive"}`} ref={distanceRef}>
                </div>
                <div className={`${selectedWidget === "daylight" ? "active esri-daylight esri-widget" : "inactive"}`} ref={daylightRef}>
                </div>
                <div className={`basemap-gallery-custom ${selectedWidget === "basemap" ? "active" : "inactive"}`} ref={basemapRef}>
                </div>
                <div className={`${selectedWidget === "layers" ? "active" : "inactive"}`} ref={layersRef}>
                </div>
                <div className={`${selectedWidget === "legends" ? "active" : "inactive"}`} ref={legendsRef}>
                </div>
                <div className={`${selectedWidget === "slides" ? "active" : "inactive"}`} >
                    <div id="createSlideDiv" className="esri-widget">
                        New slide: <input type="text" id="createSlideTitleInput" size="10" />
                        <button id="createSlideButton">Create</button>
                    </div>
                    <div id="slidesDiv" className="esri-widget"></div>
                </div>
            </div>

            <div className={`bottom-bar`} >
                <div className="search-bar" ref={searchRef}>
                </div>

                <div className="widgets-container">
                    <div className="widget-icon">
                        <span className={selectedWidget === "distance" ? "selected" : ""} onClick={() => changeWidget("distance")}>
                            <img src={'/assets/ruler-horizontal.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget === "area" ? "selected" : ""} onClick={() => changeWidget("area")}>
                            <img src={'/assets/ruler-combined.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget === "basemap" ? "selected" : ""} onClick={() => changeWidget("basemap")}>
                            <img src={'/assets/metro-map.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget === "slides" ? "selected" : ""} onClick={() => changeWidget("slides")}>
                            <img src={'/assets/slideshow.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget === "daylight" ? "selected" : ""} onClick={() => changeWidget("daylight")}>
                            <img src={'/assets/lightbulb.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget === "layers" ? "selected" : ""} onClick={() => changeWidget("layers")}>
                            <img src={'/assets/layer-group.svg'} alt="notFound" />
                        </span>
                        <span className={selectedWidget === "legends" ? "selected" : ""} onClick={() => changeWidget("legends")}>
                            <img src={'/assets/list.svg'} alt="notFound" />
                        </span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Widgets
