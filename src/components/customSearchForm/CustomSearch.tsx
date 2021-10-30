import React, { Dispatch, SetStateAction } from 'react';
import { Button, Collapse, Form, Input } from 'antd';
import './CustomSearch.scss';
const {Panel} = Collapse;

type customSearchCoordinates = {
    latitudeBottom: string
    latitudeTop: string
    longitudeLeft: string
    longitudeRight: string
  }

type propType = {
    setUpNewSearchArea : (coordinates: customSearchCoordinates) => void;
    fetchData : (coordinates: customSearchCoordinates) => void
}

const CustomSearch: React.FC<propType> = ({setUpNewSearchArea, fetchData}) => {

    const onFinish = (values: customSearchCoordinates) => {
        const {latitudeBottom, latitudeTop, longitudeLeft, longitudeRight} = values;
        setUpNewSearchArea(values);
        fetchData(values);
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    return (
        <div className="custom-search">
            <Collapse>
                <Panel header="Search on a specific Area" key="1">
                    <Form
                        layout={'inline'}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                        <Form.Item
                            label="Longitude Left"
                            name="longitudeLeft"
                            rules={[{ required: true, message: 'Please input your Longitude Left!' }, {pattern: /^([-]?[1-9][0-9]*|0)$/,
                                message: "Please input only numbers"}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Latitude Bottom"
                            name="latitudeBottom"
                            rules={[{ required: true, message: 'Please input your Latitude Bottom!' }, {pattern: /^([-]?[1-9][0-9]*|0)$/,
                            message: "Please input only numbers"}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Longitude Right"
                            name="longitudeRight"
                            rules={[{ required: true, message: 'Please input your Longitude Right!' }, {pattern: /^([-]?[1-9][0-9]*|0)$/,
                                message: "Please input only numbers"}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Latitude Top"
                            name="latitudeTop"
                            rules={[{ required: true, message: 'Please input your Latitude Top!' }, {pattern: /^([-]?[1-9][0-9]*|0)$/,
                                message: "Please input only numbers"}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item className="submit-button" wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
        </div>
    );
};


export default CustomSearch;