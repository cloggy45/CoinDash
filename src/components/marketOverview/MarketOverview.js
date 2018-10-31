import MarketOverview, { styles } from './MarketOverviewView';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import {
    getCoinPriceInfo,
    getCoinPriceInfoFetchStatus,
    getCoinPriceErrorStatus,
    getCoinPriceErrorMessage,
} from '../../reducers/coinPriceInfo/coinPriceInfoSelectors';

import { fetchCoinPriceInfo } from '../../actions/coinPriceInfo';

import {
    marketOverviewFetchStatus,
    marketOverviewErrorMessage,
    marketOverviewCurrentState,
} from '../../reducers/marketOverview/marketOverviewSelectors';
import {
    getSelectedCryptoCoin,
    getSelectedFiatCurrency,
} from '../../reducers/rootReducer';

const mapStateToProps = store => {
    return {
        overview: marketOverviewCurrentState(store),
        errorMessage: marketOverviewErrorMessage(store),
        coinPriceInfo: getCoinPriceInfo(store),
        selectedCoin: getSelectedCryptoCoin(store),
        selectedFiat: getSelectedFiatCurrency(store),
        isFetching: marketOverviewFetchStatus(store),
        isFetchingCoinPriceInfo: getCoinPriceInfoFetchStatus(store),
        coinPriceHasError: getCoinPriceErrorStatus(store),
        coinPriceErrorMessage: getCoinPriceErrorMessage(store),
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCoinOverview: (ticker, selectedFiatCurrency) =>
        dispatch(fetchCoinPriceInfo(ticker, selectedFiatCurrency)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(MarketOverview))
);
