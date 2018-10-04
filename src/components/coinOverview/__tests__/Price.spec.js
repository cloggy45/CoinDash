import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createShallow} from "@material-ui/core/test-utils";

import Price from "../Price";

Enzyme.configure({adapter: new Adapter()});

describe('Price Component', () => {
    let hocShallow;
    let component;

    beforeAll(() => {
        hocShallow = createShallow();
    });


    beforeEach(() => {
        component = hocShallow(<Price />);
    });

    it('Should render without errors', () => {
        expect(component.length).toEqual(1);
    });

    it('Should render Card Content component', () => {
        expect(component.dive().find('CardContent').exists()).toBe(true);
    });

    it('Should render typography component', () => {
        expect(component.dive().children().dive().find('Typography').exists()).toBe(true);
    });

    it('Default value prop should be 200', () => {
        const typography = component.dive().children().dive();
        expect(typography.props().children).toBe(100);
    });

    it('value prop should 150', () => {
        const customPriceComponent = hocShallow(<Price amount={2500} /> );
        const typography = customPriceComponent.dive().children().dive();
        expect(typography.props().children).toBe(2500);
    });

});