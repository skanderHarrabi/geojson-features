import axiosInstance from "../config/axios-instance";
import { customSearchCoordinates, Feature } from "../types/types";

export const getFeatures = (coordinates : customSearchCoordinates = {longitudeLeft: '11.54', latitudeBottom: '48.14', longitudeRight: '11.543', latitudeTop: '48.145'}) => {
    return axiosInstance({
      params: { bbox: `${coordinates.longitudeLeft},${coordinates.latitudeBottom},${coordinates.longitudeRight},${coordinates.latitudeTop}` },
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