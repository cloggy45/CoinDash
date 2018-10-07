import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';

import Specific from '../Specific';

Enzyme.configure({ adapter: new Adapter() });

describe('Specific Component', () => {
    let hocShallow;
    let component;

    beforeAll(() => {
        hocShallow = createShallow();
    });

    beforeEach(() => {
        component = hocShallow(<Specific />);
    });

    it('Should render without errors', () => {
        expect(component.length).toEqual(1);
    });

    it('Should render Card Content component', () => {
        expect(
            component
                .dive()
                .find('CardContent')
                .exists()
        ).toBe(true);
    });

    it('Should render typography component', () => {
        expect(
            component
                .dive()
                .children()
                .dive()
                .find('Typography')
                .exists()
        ).toBe(true);
    });
});
