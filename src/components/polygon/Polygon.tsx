import React from 'react';
import { Polygon } from '../../types/types';

import './Polygon.scss';

type propType = {
    feature: Polygon;
    showModal: () => void;
}

const PolygonFeatures: React.FC<propType> = ({feature, showModal}) => {
    return (
            <li className="polygon-item" onClick={showModal}>
                <div className="feature-container">
                    <div className="feature-properties">
                        <label><strong>Id</strong></label>
                        <p>{feature.id}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Name</strong></label>
                        <p>{feature.name || "unprovided"}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Type</strong></label>
                        <p>{feature.type}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>User</strong></label>
                        <p>{feature.user || "unprovided"}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Time</strong></label>
                        <p>{feature.timestamp || "unprovided"}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Boundary</strong></label>
                        <p>{feature.boundary || "unprovided"}</p>
                    </div>

                </div>
            </li>
    );
};

export default PolygonFeatures;