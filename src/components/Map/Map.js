import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from 'react-leaflet';

import './Map.scss'



const FeatureMap = ({feature}) => {
    const [center, setCenter] = useState([]);

    useEffect(() => {
        let firstCoordinate;
        switch (feature.geometry.type) {
            case 'Polygon':
            case 'MultiLineString':
            {
                firstCoordinate = feature.geometry.coordinates[0][0];
                break;
            }
            case 'LineString': {
                firstCoordinate = feature.geometry.coordinates[0];
                break;
            }
            default: {
                firstCoordinate = feature.geometry.coordinates
                break;
            }

        }
        setCenter(firstCoordinate.reverse());
    },[feature]);

    return (
        <div className="map-container">
            {
            center.length > 0 && <MapContainer center={center} zoom={15}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                feature.geometry.type !== 'Point' ?
                <GeoJSON key={feature.id} data={feature} />
                : <Marker position={center}>
                    {feature.properties.natural && <Popup>{feature.properties.natural}</Popup>}
                </Marker>
                }
            </MapContainer>
            }
        </div>
    );
};

export default FeatureMap;