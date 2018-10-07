import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import CoinOverview, { styles } from './CoinOverviewView';

import { addToWatchList } from '../../actions/firebase';
import { getUserID, getAuthStatus } from '../../reducers/auth/authSelectors';
import { getCoinMetaInfo } from '../../reducers/coinMetaInfo/coinMetaInfoSelectors';

import {
    getSelectedCoin,
    getSelectedCoinId,
    getCoinList,
} from '../../reducers/rootReducer';
import { fetchCoinMetaInfo } from '../../actions/coinMetaInfo';
import {
    getCoinPriceInfo,
    getCoinPriceInfoFetchStatus,
    getCoinPriceInfoError,
} from '../../reducers/coinPriceInfo/coinPriceInfoSelectors';

const mapStateToProps = store => {
    return {
        uid: getUserID(store),
        isAuthorised: getAuthStatus(store),
        isFetchingMetaInfo: getCoinPriceInfoFetchStatus(store),
        coinMetaInfo: getCoinMetaInfo(store),
        selectedCoin: getSelectedCoin(store),
        selectedCoinId: getSelectedCoinId(store),
        coinList: getCoinList(store),
        coinPriceInfo: getCoinPriceInfo(store),
        isFetchingCoinPriceInfo: getCoinPriceInfoFetchStatus(store),
        coinPriceInfoErrorMessage: getCoinPriceInfoError(store),
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCoinMetaInfo: coin => dispatch(fetchCoinMetaInfo(coin)),
    addCoinToWatchList: (coin, uid) => dispatch(addToWatchList(coin, uid)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(CoinOverview))
);
