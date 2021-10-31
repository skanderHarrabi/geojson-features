import React from "react";
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import CustomSearch from "./CustomSearch";

afterEach(cleanup);

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

test("testing the existing of the form items", async () => {
    render(<CustomSearch />);

    const longitudeLeft = screen.queryByText("Longitude Left");
    const latitudeBottom = screen.queryByText("Latitude Bottom");
    const longitudeRight = screen.queryByText("Longitude Right");
    const latitudeTop = screen.queryByText("Latitude Top");
    const button = screen.getByText("Submit");

    expect(longitudeLeft).toBeVisible();
    expect(latitudeBottom).toBeVisible();
    expect(longitudeRight).toBeVisible();
    expect(latitudeTop).toBeVisible();
    expect(button).toBeVisible();
})


test("expect form to not submit because of validation", async () => {
    const setUpNewSearchArea = jest.fn();
    const fetchData = jest.fn();
    const onSubmit = jest.fn();
    render(<CustomSearch setUpNewSearchArea={setUpNewSearchArea} fetchData={fetchData}/>);

    const button = screen.getByText("Submit");

    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(0);
})

test("expect form to be collapsed", () => {
    const props = {
        setUpNewSearchArea: jest.fn(),
        fetchData: jest.fn()
    }
   const { queryByPlaceholderText} = render(<CustomSearch setUpNewSearchArea={props.setUpNewSearchArea} fetchData={props.fetchData}/>);
    const longitudeLeft = queryByPlaceholderText("Longitude Left");
    const latitudeBottom = queryByPlaceholderText("Latitude Bottom");
    const longitudeRight = queryByPlaceholderText("Longitude Right");
    const latitudeTop = queryByPlaceholderText("Latitude Top");
    const button = screen.getByText("Submit");

    fireEvent.change(longitudeLeft, {target: {value: 11}});
    fireEvent.change(latitudeBottom, {target: {value: 11}});
    fireEvent.change(longitudeRight, {target: {value: 11}});
    fireEvent.change(latitudeTop, {target: {value: 11}});

    fireEvent.click(button);
    expect(props.setUpNewSearchArea).toHaveBeenCalled();
})