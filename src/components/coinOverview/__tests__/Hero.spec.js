import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createShallow} from '@material-ui/core/test-utils';

Enzyme.configure({adapter: new Adapter()});

const styles = {
    avatar: {
        margin: 10,
    },
};

import Hero from '../Hero';

describe('Hero Component', () => {
    let shallow;
    let renderedComponent;

    beforeAll(() => {
        shallow = createShallow({dive: true});
    });

    beforeEach(() => {
        renderedComponent = shallow(<Hero classes={styles.avatar} />);
    });

    it('Should render without error', () => {
        expect(renderedComponent.length).toEqual(1);
    });

    it('Should render avatar', () => {
       renderedComponent = shallow(<Hero src={"Some Image"} />);
       expect(renderedComponent.find('WithStyles(Avatar)').exists()).toBe(true);
    });
});

