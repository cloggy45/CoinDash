import MarketOverview, { styles } from './MarketOverviewView';
import { withStyles } from '@material-ui/core/styles';
import { fetchMarketOverview } from '../../actions/marketOverview';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import {
    getCoinPriceInfo,
    getCoinPriceInfoFetchStatus,
} from '../../reducers/coinPriceInfo/coinPriceInfoSelectors';

import {
    fetchStatus,
    getErrorMessage,
    getMarketOverview,
} from '../../reducers/marketOverview/marketOverviewSelectors';
import { getSelectedCoin } from '../../reducers/rootReducer';

const mapStateToProps = store => {
    return {
        overview: getMarketOverview(store),
        errorMessage: getErrorMessage(store),
        isFetching: fetchStatus(store),
        coinPriceInfo: getCoinPriceInfo(store),
        isFetchingCoinPriceInfo: getCoinPriceInfoFetchStatus(store),
        selectedCoin: getSelectedCoin(store),
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOverview: () => dispatch(fetchMarketOverview()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(MarketOverview))
);
