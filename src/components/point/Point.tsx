import React from 'react';
import { Point } from '../../types/types';

type propType = {
    feature: Point;
}

const PointFeatures : React.FC<propType> = ({feature}) => {
    return (
        <li>
            <div className="feature-container">
                <div className="feature-properties">
                    <label><strong>Id</strong></label>
                    <p>{feature.id}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>Natural</strong></label>
                    <p>{feature.natural || "unprovided"}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>Type</strong></label>
                    <p>{feature.type}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>User</strong></label>
                    <p>{feature.user || "unprovided"}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>Time</strong></label>
                    <p>{feature.timestamp || "unprovided"}</p>
                </div>
            </div>
        </li>
    );
};

export default PointFeatures;