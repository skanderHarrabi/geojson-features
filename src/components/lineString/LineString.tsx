import React from 'react';
import { LineString } from '../../types/types';

import './LineString.scss';

type propType = {
    feature: LineString;
}

const LineStringFeatures: React.FC<propType> = ({feature}) => {
    return (
        <li className="Line-string-item">
                <div className="feature-container">
                    <div className="feature-properties">
                        <label><strong>Id</strong></label>
                        <p>{feature.id}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>From</strong></label>
                        <p>{feature.from || "unprovided"}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>To</strong></label>
                        <p>{feature.to}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Operator</strong></label>
                        <p>{feature.operator || "unprovided"}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Time</strong></label>
                        <p>{feature.timestamp || "unprovided"}</p>
                    </div>
                    <div className="feature-properties">
                        <label><strong>Type</strong></label>
                        <p>{feature.type || "unprovided"}</p>
                    </div>

                </div>
            </li>
    );
};

export default LineStringFeatures;