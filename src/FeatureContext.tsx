import osmtogeojson from 'osmtogeojson';
import React, {useState, useEffect} from 'react';
import { getFeatures } from './actions/Features';
import { Feature, LineString, MultiLineString, Point } from './types/types';

const FeatureContext = React.createContext([]);
type propType = Feature | LineString | MultiLineString | Point;

const FeatureProvider: React.FC = ({children}) => {

    const [data, setData] = useState<propType[]>([]);
    const [errors, setErrors] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        try {
            const response = await getFeatures();
            const {features} = osmtogeojson(response.data);
            console.log('features :',features, response.data)
            let featuresTab: propType[] = [];
            const map = new Set();
            const map1 = new Set();
            features.forEach(({geometry,properties,id}) => {
              map.add(geometry.type);
              map1.add(properties.type);
              let item: Feature = {
                id: id,
                user: properties.user,
                name: properties.name,
                timestamp: properties.timestamp,
                type: geometry.type,
                boundary: properties.boundary,
                coordinates: geometry.type === 'Point' ? geometry.coordinates : [],
                geomatryType: geometry.type
              };
              featuresTab.push(item);
            });
            console.log('eeee', map, map1);
            setData(featuresTab);

        } catch(err) {
          setErrors(true)
        }
    }

    useEffect(() => {
        console.log('blablba')
      fetchData();
    },[setData]);

    return (
        <FeatureContext.Provider value={[]}>
            {children}
        </FeatureContext.Provider>
    );
};

export default FeatureProvider;