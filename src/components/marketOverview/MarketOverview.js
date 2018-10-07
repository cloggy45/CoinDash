import MarketOverview, { styles } from './MarketOverviewView';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import {
    getCoinPriceInfo,
    getCoinPriceInfoFetchStatus,
} from '../../reducers/coinPriceInfo/coinPriceInfoSelectors';

import { fetchCoinPriceInfo } from '../../actions/coinPriceInfo';

import {
    marketOverviewFetchStatus,
    marketOverviewErrorMessage,
    marketOverviewCurrentState,
} from '../../reducers/marketOverview/marketOverviewSelectors';
import { getSelectedCoin } from '../../reducers/rootReducer';

const mapStateToProps = store => {
    return {
        overview: marketOverviewCurrentState(store),
        errorMessage: marketOverviewErrorMessage(store),
        coinPriceInfo: getCoinPriceInfo(store),
        selectedCoin: getSelectedCoin(store),
        isFetching: marketOverviewFetchStatus(store),
        isFetchingCoinPriceInfo: getCoinPriceInfoFetchStatus(store),
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCoinOverview: ticker => dispatch(fetchCoinPriceInfo(ticker)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(MarketOverview))
);
