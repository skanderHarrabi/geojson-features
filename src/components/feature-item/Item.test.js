import React from 'react';
import {render, screen, mount} from '@testing-library/react';
import Item from './Item';
import PolygonFeatures from '../polygon/Polygon';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

test('test if main container exists', async () => {
    const { getByTestId } = render(<Item />);
    expect(getByTestId('main-container')).toBeVisible();
});