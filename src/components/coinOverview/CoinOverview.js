import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import CoinOverview, { styles } from './CoinOverviewView';

import { addToWatchList, removeFromWatchList } from '../../actions/firebase';
import { getUserID, getAuthStatus } from '../../reducers/auth/authSelectors';
import {
    getCoinMetaInfo,
    getCoinMetaInfoFetchStatus,
} from '../../reducers/coinMetaInfo/coinMetaInfoSelectors';

import { getWatchList } from '../../reducers/watchlist/watchlistSelectors';

import {
    getCoinList,
    getCoinListFetchStatus,
} from '../../reducers/coinList/coinListSelectors';

import { fetchCoinMetaInfo } from '../../actions/coinMetaInfo';

import {
    getCoinPriceInfo,
    getCoinPriceInfoFetchStatus,
    getCoinPriceErrorMessage,
    getCoinPriceErrorStatus,
} from '../../reducers/coinPriceInfo/coinPriceInfoSelectors';

import { getSelectedCoin, getSelectedCoinId } from '../../reducers/rootReducer';

const mapStateToProps = store => ({
    watchList: getWatchList(store),
    uid: getUserID(store),
    isAuthorised: getAuthStatus(store),
    isFetchingMetaInfo: getCoinMetaInfoFetchStatus(store),
    coinMetaInfo: getCoinMetaInfo(store),
    selectedCoin: getSelectedCoin(store),
    selectedCoinId: getSelectedCoinId(store),
    coinList: getCoinList(store),
    coinListFetchStatus: getCoinListFetchStatus(store),
    coinPriceInfo: getCoinPriceInfo(store),
    coinPriceHasError: getCoinPriceErrorStatus(store),
    isFetchingCoinPriceInfo: getCoinPriceInfoFetchStatus(store),
    coinPriceErrorMessage: getCoinPriceErrorMessage(store),
});

const mapDispatchToProps = dispatch => ({
    fetchCoinMetaInfo: coin => dispatch(fetchCoinMetaInfo(coin)),
    addCoinToWatchList: (coinName, coinId, uid) =>
        dispatch(addToWatchList(coinName, coinId, uid)),
    removeFromWatchList: (coinName, uid) => dispatch(removeFromWatchList(coinName, uid))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(CoinOverview))
);
