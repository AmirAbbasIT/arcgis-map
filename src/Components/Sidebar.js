import React, { useState } from 'react'
import Card from './Card';

const Sidebar = () => {

    const [activeSidebar, setActiveSidebar] = useState(false);

    return (
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
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar
