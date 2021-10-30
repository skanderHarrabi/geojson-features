import React from 'react';
import './components/feature-item/Item';
import Item from './components/feature-item/Item';
import { Pagination } from 'antd';

import './App.scss';



function App() {
  return (
      <div className="App">
        <div className="main">
          <ul className="main-container">
            <Item />
          </ul>
        </div>
      </div>
  );
}

export default App;
