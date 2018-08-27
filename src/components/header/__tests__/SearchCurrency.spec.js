import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Options, styles  } from '../options/SearchCurrencyView';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchCurrency Component', () => {
    let getTickers, setOptions;

    beforeEach(() => {
        getTickers = jest.fn();
        setOptions = jest.fn();
    });

    it('Should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Options  classes={styles} getTickers={getTickers} setOption={setOptions}/>, div);
    });

    it('Should call getTickers initially when loading', () => {
        const component = shallow(<Options getTickers={getTickers}/>);
        expect(getTickers).toHaveBeenCalledTimes(1);
    });

    it('Should render loading if there are no options', () => {
        const tree= renderer.create(<Options options={null} />).toJSON();
        expect(tree).toMatchSnapshot();

    });
});