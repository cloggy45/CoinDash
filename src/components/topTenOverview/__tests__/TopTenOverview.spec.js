import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

import {TopTenOverview, styles} from '../TopTenOverviewView';

describe('TopTenOverview Component', () => {
    let addFavouritesMock, fetchMock;
    let payload;
    beforeAll(() => {
        addFavouritesMock = jest.fn();
        fetchMock = jest.fn();
        payload = {
            data: {
                '1': {
                    id: 1,
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    website_slug: 'bitcoin',
                    rank: 1,
                    circulating_supply: 17178675.0,
                    total_supply: 17178675.0,
                    max_supply: 21000000.0,
                    quotes: {
                        USD: {
                            price: 8191.35,
                            volume_24h: 4018910000.0,
                            market_cap: 140716539461.0,
                            percent_change_1h: 0.03,
                            percent_change_24h: 0.06,
                            percent_change_7d: 9.56
                        }
                    },
                    last_updated: 1532888969
                },
                '1027': {
                    id: 1027,
                    name: 'Ethereum',
                    symbol: 'ETH',
                    website_slug: 'ethereum',
                    rank: 2,
                    circulating_supply: 100996809.0,
                    total_supply: 100996809.0,
                    max_supply: null,
                    quotes: {
                        USD: {
                            price: 465.417,
                            volume_24h: 1570840000.0,
                            market_cap: 47005631825.0,
                            percent_change_1h: 0.11,
                            percent_change_24h: -0.11,
                            percent_change_7d: 0.15
                        }
                    },
                    last_updated: 1532888988
                }
            }
        };
    });

    afterEach(() => {
        fetchMock.mockClear();
        addFavouritesMock.mockClear();
    });

    it('Should render', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TopTenOverview classes={styles} topTen={[]} fetch={fetchMock}/>, div);
    });

    it('Should call fetchData on load', () => {
        const component = shallow(<TopTenOverview classes={styles} topTen={[]} fetch={fetchMock}/>);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('Should render Circular progress bar when there is no top ten data', () => {
        const tree = renderer.create(<TopTenOverview classes={styles} isFetching={false} topTen={[]}
                                                     fetch={fetchMock}/>);
        expect(tree).toMatchSnapshot();
    });

    it('Should render Circular progress bar when fetching data', () => {
        const tree = renderer.create(<TopTenOverview classes={styles} isFetching={true} topTen={payload} fetch={fetchMock}/>);
        expect(tree).toMatchSnapshot();
    });
});