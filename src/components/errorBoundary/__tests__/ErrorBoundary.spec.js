import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorBoundary from '../ErrorBoundary';

Enzyme.configure({adapter: new Adapter()});

describe('Error Boundary', () => {
    let Component;
    beforeEach(() => {
        Component = () => {
            throw "Error";
        };
    });
    it('Should catch error', () => {
        const wrapper = mount(
            <ErrorBoundary render={() => <h1>Error Encountered</h1>}>
                <Component/>
            </ErrorBoundary>);
        expect(wrapper.text()).toEqual("Error Encountered")
    });
});