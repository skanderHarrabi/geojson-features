import axiosInstance from "../config/axios-instance";

export const getFeatures = () => {
    return axiosInstance({
      method: "get"
    });
}

// set polygon attribute if the feature is of type polygon
export const setPolygonAttributes = (feature) => {
  const item = {
    id: feature.id,
    user: feature.properties.user,
    name: feature.properties.name,
    timestamp: feature.properties.timestamp,
    type: feature.geometry.type,
    boundary: feature.properties.boundary,
    coordinates: feature.geometry.type === 'Point' ? feature.geometry.coordinates : [],
    geomatryType: feature.geometry.type
  };
  return item;
}

// set polygon attribute if the feature is of type point
export const setPointAttributes = (feature) => {
  const item = {
    id: feature.id,
    user: feature.properties.user,
    natural: feature.properties.natural,
    timestamp: feature.properties.timestamp,
    type: feature.geometry.type,
    coordinates: feature.geometry.type === 'Point' ? feature.geometry.coordinates : [],
    geomatryType: feature.geometry.type
  };
  return item;
}

// set polygon attribute if the feature is of type line string
export const setLineStringAttributes = (feature) => {
  const item = {
    id: feature.id,
    operator: feature.properties.operator,
    from: feature.properties.from,
    to: feature.properties.to,
    timestamp: feature.properties.timestamp,
    type: feature.geometry.type,
    coordinates: feature.geometry.type === 'Point' ? feature.geometry.coordinates : [],
    geomatryType: feature.geometry.type
  };
  return item;
}


// set polygon attribute if the feature is of type multi line string
export const setMultiLineStringAttributes = (feature) => {
  const item = {
    id: feature.id,
    route: feature.properties.route,
    from: feature.properties.from,
    to: feature.properties.to,
    timestamp: feature.properties.timestamp,
    user: feature.properties.user,
    type: feature.geometry.type,
    ref: feature.properties.ref,
    coordinates: feature.geometry.type === 'Point' ? feature.geometry.coordinates : [],
    geomatryType: feature.geometry.type
  };
  return item;
}