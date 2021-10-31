import React from 'react';
import './Indicators.scss';
const Indicators = () => {
    return (
        <div className='indi'>
            <div className="flex-display">
                <div className="box poly-color"></div>
                Polygon
            </div>
            <div className="flex-display">
            <div className="box line-color"></div>
                Line String
            </div>
            <div className="flex-display">
            <div className="box multiline-color"></div>
                MultiLine String
            </div>
            <div className="flex-display">
            <div className="box point-color"></div>
                Point
            </div>
        </div>
    );
};

export default Indicators;