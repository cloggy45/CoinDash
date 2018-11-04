import { connect } from 'react-redux';

import { fetchCoinPriceInfo } from '../../../actions/coinPriceInfo';
import { fetchCoinMetaInfo } from '../../../actions/coinMetaInfo';
import { setSelectedCoin } from '../../../actions/selected';
import { fetchWatchList, removeFromWatchList } from '../../../actions/firebase';
import { getUserID } from '../../../reducers/auth/authSelectors';

import WatchListItems from './WatchListMenuView';
import { getSelectedFiatCurrency } from '../../../reducers/rootReducer';
import {
    getWatchList,
    getWatchListErrorMessage,
    getWatchListFetchStatus,
} from '../../../reducers/watchlist/watchlistSelectors';

const mapStateToProps = store => ({
    userId: getUserID(store),
    selectedFiat: getSelectedFiatCurrency(store),
    userWatchList: getWatchList(store),
    watchListFetchStatus: getWatchListFetchStatus(store),
    watchListErrorMessage: getWatchListErrorMessage(store),
});

const mapDispatchToProps = dispatch => ({
    handlerLoadCoinDashboard: (coinName, coinId, fiatSymbol) => {
        dispatch(setSelectedCoin(coinName, coinId));
        dispatch(fetchCoinMetaInfo(coinId));
        dispatch(fetchCoinPriceInfo(coinName, fiatSymbol));
    },
    fetchWatchList: uid => dispatch(fetchWatchList(uid)),
    setSelectedCoin: (coinName, coinId) =>
        dispatch(setSelectedCoin(coinName, coinId)),
    handlerRemoveFromWatchList: (coinName, uid) =>
        dispatch(removeFromWatchList(coinName, uid)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchListItems);
