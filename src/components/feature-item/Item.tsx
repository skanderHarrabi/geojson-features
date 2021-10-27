import React, {useState, useEffect} from 'react';
import { Feature, LineString, MultiLineString, Point } from '../../types/types';
import PolygonFeatures from '../polygon/Polygon';
import { Pagination } from 'antd';
import osmtogeojson from 'osmtogeojson';
import { Loading } from '../loading-spinner/Spinner';
import { getFeatures, setLineStringAttributes, setMultiLineStringAttributes, setPointAttributes, setPolygonAttributes } from '../../actions/Features';
import LineStringFeatures from '../lineString/LineString';

import './Item.scss';
import MultiLineStringFeatures from '../multiLineString/MultiLineString';
import PointFeatures from '../point/Point';


type propType = Feature | LineString | MultiLineString | Point;

const Item = () => {

  const [data, setData] = useState<propType[]>();
  const [paginatedData, setPaginatedData] = useState<propType[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState<boolean>(false);

  const showModal = () => {
    console.log('clicked')
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //set up features comming from the api or localstorage
  const setFeatures = (features:any) => {
    let featuresTab: propType[] = [];
    features.forEach((feature: any) => {
        let item : Feature | LineString | MultiLineString | Point;
        switch(feature.geometry.type) {
            case "Polygon": {
                item = setPolygonAttributes(feature);
                break;
            }
            case "LineString": {
                item = setLineStringAttributes(feature);
                break;
            }
            case "MultiLineString": {
                item = setMultiLineStringAttributes(feature);
                break;
            }
            default : {
                item = setPointAttributes(feature);
            }
        }
        featuresTab.push(item);
    });
    setData(featuresTab);
    setPaginatedData(olddata => olddata = featuresTab.slice(0,10));
  }

  const fetchData = async (): Promise<void> => {
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
          setFeatures(features);
      } catch(err) {
        console.error(err);
        setErrors(true)
      }
  }

  const onChange = (page: any) => {
    console.log(page);
    const indexOfLastPost = page * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    setPaginatedData(oldData => oldData = data?.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
      fetchData();
      console.log('blablba', paginatedData);
  },[setData]);

    return (
        <>
            <div className="feature">
                {
                    !errors ?
                    paginatedData && paginatedData.length > 0 ?
                        paginatedData.map((feature, index: number) => {
                          return feature.type === "Polygon" ?
                          <PolygonFeatures key={index} feature = {feature as Feature}/> :
                          feature.type === "LineString" ?
                          <LineStringFeatures key={index} feature = {feature as LineString} />
                          : feature.type === "MultiLineString" ?
                          <MultiLineStringFeatures key={index} feature = {feature as MultiLineString} />
                          : feature.type === "Point" &&
                          <PointFeatures key={index} feature = {feature as Point} />
                        })
                        : <Loading />
                    : <p>ldlsldsld</p>
                }
            </div>
            {!errors && paginatedData && paginatedData.length > 0 && <Pagination defaultCurrent={1} onChange={onChange} total={data?.length} />}
            {/* <Pagination defaultCurrent={1} total={data.length} /> */}
        </>
    );
}

export default Item;