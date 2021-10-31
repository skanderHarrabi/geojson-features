import React from 'react';
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
    fetchData : (coordinates: customSearchCoordinates) => void
}

const CustomSearch: React.FC<propType> = ({fetchData}) => {

    const onSubmit = (values: customSearchCoordinates) : void => {
        fetchData(values);
    };

    return (
        <div className="custom-search">
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Search on a specific Area" key="1">
                    <Form
                        layout={'inline'}
                        name="form"
                        initialValues={{ remember: true }}
                        onFinish={onSubmit}
                        autoComplete="off"
                        data-testid="test"
                        >
                        <Form.Item
                            label="Longitude Left"
                            name="longitudeLeft"
                            rules={[{ required: true, message: 'Please input your Longitude Left!' }, {pattern: /^([-]?[1-9][0-9]*([.][1-9][0-9]*)?|0)$/,
                                message: "Please input only numbers"}]}
                        >
                            <Input placeholder="Longitude Left" />
                        </Form.Item>

                        <Form.Item
                            label="Latitude Bottom"
                            name="latitudeBottom"
                            rules={[{ required: true, message: 'Please input your Latitude Bottom!' }, {pattern: /^([-]?[1-9][0-9]*([.][1-9][0-9]*)?|0)$/,
                            message: "Please input only numbers"}]}
                        >
                            <Input placeholder="Latitude Bottom" />
                        </Form.Item>

                        <Form.Item
                            label="Longitude Right"
                            name="longitudeRight"
                            rules={[{ required: true, message: 'Please input your Longitude Right!' }, {pattern: /^([-]?[1-9][0-9]*([.][1-9][0-9]*)?|0)$/,
                                message: "Please input only numbers"}]}
                        >
                            <Input placeholder="Longitude Right" />
                        </Form.Item>

                        <Form.Item
                            label="Latitude Top"
                            name="latitudeTop"
                            rules={[{ required: true, message: 'Please input your Latitude Top!' }, {pattern: /^([-]?[1-9][0-9]*([.][1-9][0-9]*)?|0)$/,
                                message: "Please input only numbers"}]}
                        >
                            <Input placeholder="Latitude Top" />
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