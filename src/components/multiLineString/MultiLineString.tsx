import React from 'react';
import { MultiLineString } from '../../types/types';

import './MultiLineString.scss';

type propType = {
    feature: MultiLineString;
    showModal: () => void;
}

const MultiLineStringFeatures : React.FC<propType> = ({feature, showModal}) => {
    return (
        <li className="multi-line-string-item" onClick={showModal}>
            <div className="feature-container">
                <div className="feature-properties">
                    <label><strong>Id</strong></label>
                    <p>{feature.id}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>Route</strong></label>
                    <p>{feature.route || "unprovided"}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>Type</strong></label>
                    <p>{feature.type}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>From</strong></label>
                    <p>{feature.from || "unprovided"}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>To</strong></label>
                    <p>{feature.to || "unprovided"}</p>
                </div>
                <div className="feature-properties">
                    <label><strong>Time</strong></label>
                    <p>{feature.timestamp || "unprovided"}</p>
                </div>
            </div>
        </li>
    );
};

export default MultiLineStringFeatures;