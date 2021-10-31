import React, {useState, useEffect} from 'react';
import { Polygon, LineString, MultiLineString, Point, customSearchCoordinates, Feature, ItemPropType } from '../../types/types';
import PolygonFeatures from '../polygon/Polygon';
import { Alert, Modal, Pagination } from 'antd';
import { Loading } from '../loading-spinner/Spinner';
import { getFeatures, setLineStringAttributes, setMultiLineStringAttributes, setPointAttributes, setPolygonAttributes } from '../../actions/Helpers';
import LineStringFeatures from '../lineString/LineString';
import MultiLineStringFeatures from '../multiLineString/MultiLineString';
import PointFeatures from '../point/Point';
import FeatureMap from '../Map/Map';
import CustomSearch from '../customSearchForm/CustomSearch';

import './Item.scss';
import osmtogeojson from 'osmtogeojson';
import Indicators from '../Indocators/Indicators';

const Item: React.FC = () => {

  const [data, setData] = useState<ItemPropType[]>();
  const [apiData, setApiData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [featureToDesplay, setFeatureToDesplay] = useState<Feature>();
  const [paginatedData, setPaginatedData] = useState<ItemPropType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState<boolean>(false);

  const showModal = (index: number) => {
    const indexOfLastPost = pageNumber * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    setFeatureToDesplay(apiData?.slice(indexOfFirstPost, indexOfLastPost)[index]);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setFeatureToDesplay([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFeatureToDesplay([]);
  };

  //set up features comming from the api or localstorage
  const setFeatures = (features: Feature) => {
    let featuresTab: ItemPropType[] = [];
    features.forEach((feature: Feature) => {
        let item : Polygon | LineString | MultiLineString | Point;
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
    setPaginatedData(olddata => olddata = featuresTab.slice(0, 10));
    setLoading(false);
  }

  const onChange = (page: number) => {
    setPageNumber(page);
    const indexOfLastPost = page * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    setPaginatedData(oldData => oldData = data?.slice(indexOfFirstPost, indexOfLastPost));
  };

  const fetchData = async (coordinates?: customSearchCoordinates) => {
    try {
        setLoading(true);
        let features;
        if(coordinates) {
          localStorage.removeItem('cachedData');
          setData([]);
          setPaginatedData([]);
          setErrors(false);
        }
        if(!localStorage.getItem('cachedData')) {
          const response = await getFeatures(coordinates);
          features = osmtogeojson(response.data).features;
          //cache data comming from the api into the localstorage
          localStorage.setItem('cachedData',JSON.stringify(features));
        } else {
          features = JSON.parse(localStorage.getItem('cachedData') as string);
        }
        setApiData(features);
        setFeatures(features);
    } catch(err) {
      setErrors(true);
      setLoading(false);
    }
  }

  useEffect(() => {
      fetchData();
  },[]);

    return (
        <>
            <CustomSearch fetchData={fetchData}/>
            {paginatedData && paginatedData.length > 0 &&  <Indicators />}
            <div data-testid="main-container" className="feature">
                {
                    !loading ?
                            paginatedData && paginatedData.length > 0 ? paginatedData?.map((feature, index: number) => {
                            return feature.type === "Polygon" ?
                            <PolygonFeatures key={index} showModal={()=>showModal(index)} feature = {feature as Polygon}/> :
                            feature.type === "LineString" ?
                            <LineStringFeatures key={index} showModal={()=>showModal(index)} feature = {feature as LineString} />
                            : feature.type === "MultiLineString" ?
                            <MultiLineStringFeatures key={index} showModal={()=>showModal(index)} feature = {feature as MultiLineString} />
                            : feature.type === "Point" &&
                            <PointFeatures key={index} showModal={()=>showModal(index)} feature = {feature as Point} />
                          }) : <p style={{marginTop: "50px"}}>No Entries</p>
                        : <Loading />
                }
                {errors && <Alert message="Error" description="There is an error Search in another Area please" type="error" showIcon />}
            </div>
            {!errors && paginatedData && paginatedData.length > 0 && <Pagination showSizeChanger={false} hideOnSinglePage={true} defaultCurrent={1} onChange={onChange} total={data?.length} />}
            <Modal destroyOnClose={true} centered width={1000} footer={null} title="Feature Visualisation On Map" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
                <FeatureMap feature={featureToDesplay}/>
            </Modal>
        </>
    );
}

export default Item;
