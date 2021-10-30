import axiosInstance from "../config/axios-instance";
import osmtogeojson from 'osmtogeojson';
import { customSearchCoordinates, Feature } from "../types/types";

type fetchDataparams = {
  setApiData: (features:Feature) => void,
  setFeatures: (features:Feature) => void,
  setErrors: (param: boolean) => void,
  coordinates?: customSearchCoordinates
}

export const getFeatures = () => {
    return axiosInstance({
      method: "get"
    });
}

// set polygon attribute if the feature is of type polygon
export const setPolygonAttributes = ({properties, geometry, id}: Feature) => {
  const item = {
    id: id,
    user: properties.user,
    name: properties.name,
    timestamp: properties.timestamp,
    type: geometry.type,
    boundary: properties.boundary,
    coordinates: geometry.coordinates,
    geomatryType: geometry.type
  };
  return item;
}

// set polygon attribute if the feature is of type point
export const setPointAttributes = ({properties, geometry, id}: Feature) => {
  const item = {
    id: id,
    user: properties.user,
    natural: properties.natural,
    timestamp: properties.timestamp,
    type: geometry.type,
    coordinates: geometry.coordinates,
    geomatryType: geometry.type
  };
  return item;
}

// set polygon attribute if the feature is of type line string
export const setLineStringAttributes = ({properties, geometry, id}: Feature) => {
  const item = {
    id: id,
    operator: properties.operator,
    from: properties.from,
    to: properties.to,
    timestamp: properties.timestamp,
    type: geometry.type,
    coordinates: geometry.coordinates,
    geomatryType: geometry.type
  };
  return item;
}


// set polygon attribute if the feature is of type multi line string
export const setMultiLineStringAttributes = ({properties, geometry, id}: Feature) => {
  const item = {
    id: id,
    route: properties.route,
    from: properties.from,
    to: properties.to,
    timestamp: properties.timestamp,
    user: properties.user,
    type: geometry.type,
    ref: properties.ref,
    coordinates: geometry.coordinates,
    geomatryType: geometry.type
  };
  return item;
}

export const fetchData = async (setApiData: any, setFeatures: any, setErrors: any, coordinates?: customSearchCoordinates) => {
  try {
      let features;

      if(!localStorage.getItem('cachedData')) {
        const response = await getFeatures();
        features = osmtogeojson(response.data).features;
        //cache data comming from the api into the localstorage
        localStorage.setItem('cachedData',JSON.stringify(features));
      } else {
        features = JSON.parse(localStorage.getItem('cachedData') as string);
      }
      setApiData(features);
      setFeatures(features);
  } catch(err) {
    setErrors(true)
  }
}