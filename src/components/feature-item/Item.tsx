import React, {useState, useEffect} from 'react';
import { Polygon, LineString, MultiLineString, Point, customSearchCoordinates, Feature, ItemPropType } from '../../types/types';
import PolygonFeatures from '../polygon/Polygon';
import { Modal, Pagination } from 'antd';
import { Loading } from '../loading-spinner/Spinner';
import { fetchData, setLineStringAttributes, setMultiLineStringAttributes, setPointAttributes, setPolygonAttributes } from '../../actions/Features';
import LineStringFeatures from '../lineString/LineString';
import MultiLineStringFeatures from '../multiLineString/MultiLineString';
import PointFeatures from '../point/Point';
import FeatureMap from '../Map/Map';
import CustomSearch from '../customSearchForm/CustomSearch';

import './Item.scss';

const Item: React.FC = () => {

  const [data, setData] = useState<ItemPropType[]>();
  const [apiData, setApiData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [customSearchCoordinates, setCustomSearchCoordinates] = useState<customSearchCoordinates>();
  const [featureToDesplay, setFeatureToDesplay] = useState<Feature>();
  const [paginatedData, setPaginatedData] = useState<ItemPropType[]>();
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
  }

  const onChange = (page: number) => {
    setPageNumber(page);
    const indexOfLastPost = page * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    setPaginatedData(oldData => oldData = data?.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
      fetchData(setApiData, setFeatures, setErrors);
  },[setData]);

    return (
        <>
            <CustomSearch setUpNewSearchArea={setCustomSearchCoordinates} fetchData={()=> fetchData(setApiData, setFeatures, setErrors)} />
            <div className="feature">
                {
                    !errors ?
                    paginatedData && paginatedData.length > 0 ?
                        paginatedData.map((feature, index: number) => {
                          return feature.type === "Polygon" ?
                          <PolygonFeatures key={index} showModal={()=>showModal(index)} feature = {feature as Polygon}/> :
                          feature.type === "LineString" ?
                          <LineStringFeatures key={index} showModal={()=>showModal(index)} feature = {feature as LineString} />
                          : feature.type === "MultiLineString" ?
                          <MultiLineStringFeatures key={index} showModal={()=>showModal(index)} feature = {feature as MultiLineString} />
                          : feature.type === "Point" &&
                          <PointFeatures key={index} showModal={()=>showModal(index)} feature = {feature as Point} />
                        })
                        : <Loading />
                    : <p>ldlsldsld</p>
                }
            </div>
            {!errors && paginatedData && paginatedData.length > 0 && <Pagination showSizeChanger={false} hideOnSinglePage={true} defaultCurrent={1} onChange={onChange} total={data?.length} />}
            <Modal destroyOnClose={true} centered width={1000} title="Basic Modal" visible={isModalVisible} onOk={handleOk}>
                <FeatureMap feature={featureToDesplay}/>
            </Modal>
        </>
    );
}

export default Item;
