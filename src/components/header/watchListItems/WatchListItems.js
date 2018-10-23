import { connect } from 'react-redux';

import { fetchCoinPriceInfo } from '../../../actions/coinPriceInfo';
import { fetchCoinMetaInfo } from '../../../actions/coinMetaInfo';
import { setSelectedCoin } from '../../../actions/selected';
import { removeFromWatchList } from '../../../actions/firebase';
import { getUserID } from '../../../reducers/auth/authSelectors';

import WatchListItems from './WatchListItemsView';

const mapStateToProps = store => ({
    userId: getUserID(store),
});

const mapDispatchToProps = dispatch => ({
    handlerLoadCoinDashboard: function(coinName, coinId) {
        dispatch(setSelectedCoin(coinName, coinId));
        dispatch(fetchCoinMetaInfo(coinId));
        dispatch(fetchCoinPriceInfo(coinName));
    },
    setSelectedCoin: (coinName, coinId) =>
        dispatch(setSelectedCoin(coinName, coinId)),
    handlerRemoveFromWatchList: (coinName, uid) =>
        dispatch(removeFromWatchList(coinName, uid)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchListItems);
