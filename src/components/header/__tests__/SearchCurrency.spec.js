import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchCurrency, styles } from '../options/SearchCurrencyView';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchCurrency Component', () => {
    let getCoinList, setOptions;

    beforeEach(() => {
        getCoinList = jest.fn();
        setOptions = jest.fn();
    });

    it('Should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <SearchCurrency
                classes={styles}
                getCoinList={getCoinList}
                setSelectedCoin={setOptions}
            />,
            div
        );
    });

    it('Should render loading if there are no options', () => {
        const tree = renderer
            .create(
                <SearchCurrency options={null} setSelectedCoin={setOptions} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
