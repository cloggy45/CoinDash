import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { createShallow } from '@material-ui/core/test-utils';

Enzyme.configure({adapter: new Adapter()});

import {Graph, styles, GraphHolder} from '../GraphView';

describe('Graph Component', () => {  

  it('Should render bar graph without error', () => {
    const wrapper = shallow(<Graph fetchCoinHistory={jest.fn()} classes={styles.card} />);
    expect(wrapper.dive().find('Bar').exists()).toBe(true);
  });
});

describe('Graph Holder Component', () => {
  
  it('Should render without error', () => {
    const wrapper = shallow(<GraphHolder classes={styles.card} />);
    expect(wrapper.dive().find('Card').exists()).toBe(true);    
  })
  
});