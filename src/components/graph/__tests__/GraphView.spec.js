import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { Graph, styles, GraphHolder } from '../GraphView';

describe('Graph Component', () => {
    function setupComponent(type = '') {
        return shallow(
            <Graph
                graphType={type}
                fetchCoinHistory={jest.fn()}
                classes={styles.card}
            />
        );
    }

    it('Should render loading spinner', () => {
        const wrapper = shallow(
            <Graph
                isLoading={true}
                fetchCoinHistory={jest.fn()}
                classes={styles.card}
            />
        );
        expect(
            wrapper
                .dive()
                .find('CircularProgress')
                .exists()
        ).toBe(true);
    });

    it('Should render Bar graph without error', () => {
        const wrapper = setupComponent('Bar');
        expect(
            wrapper
                .dive()
                .find('Bar')
                .exists()
        ).toBe(true);
    });

    it('Should render Line graph without error', () => {
        const wrapper = setupComponent('Line');
        expect(
            wrapper
                .dive()
                .find('Line')
                .exists()
        ).toBe(true);
    });

    it('Should render Doughnut graph without error', () => {
        const wrapper = setupComponent('Doughnut');
        expect(
            wrapper
                .dive()
                .find('Doughnut')
                .exists()
        ).toBe(true);
    });
});

describe('Graph Holder Component', () => {
    it('Should render without error', () => {
        const wrapper = shallow(<GraphHolder classes={styles.card} />);
        expect(
            wrapper
                .dive()
                .find('Card')
                .exists()
        ).toBe(true);
    });
});
