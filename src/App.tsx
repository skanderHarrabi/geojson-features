import React from 'react';
import './components/feature-item/Item';
import Item from './components/feature-item/Item';
import { Pagination } from 'antd';
import FeatureProvider from './FeatureContext';

import './App.scss';



function App() {
  return (
      <div className="App">
        <div className="main">
        <ul className="main-container">
          <Item />
        </ul>
        {/* <Pagination defaultCurrent={1} total={50} /> */}
        </div>
      </div>
  );
}

export default App;
