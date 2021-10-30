export interface Polygon {
    geomatryType: string,
    coordinates?: any,
    name?: string,
    timestamp?: string,
    id?: string | number,
    type?: string,
    user?: string,
    boundary?: string
}

export interface LineString {
    geomatryType: string,
    coordinates?: any,
    from?: string,
    to?: string,
    type?: string,
    id?: string | number,
    operator?: string,
    timestamp?: string,
}

export interface MultiLineString {
    geomatryType: string,
    coordinates?: any,
    route: string,
    from?: string,
    to?: string,
    type?: string,
    id?: string | number,
    user?: string,
    ref?: string,
    timestamp?: string,
}

export interface Point {
    geomatryType: string,
    coordinates?: any,
    natural?: string,
    timestamp?: string,
    id?: string,
    user?: string,
    type?: string
}

export type customSearchCoordinates = {
    latitudeBottom: string
    latitudeTop: string
    longitudeLeft: string
    longitudeRight: string
}

export type ItemPropType = Polygon | LineString | MultiLineString | Point;

export type Feature = any;