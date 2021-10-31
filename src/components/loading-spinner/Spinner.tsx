import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 70 }} spin />

export const Loading = () => (


  <div>
    <Spin indicator={antIcon} />
  </div>
);