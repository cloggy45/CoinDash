import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Header, { styles } from './HeaderView';

import { signIn, signOut, fetchUser } from '../../actions/auth';

import {
    getAuthStatus,
    getLoadingStatus,
    getUserProfile,
    getUserID,
} from '../../reducers/auth/authSelectors';
import {
    getWatchList,
    getWatchListErrorMessage,
    getWatchListFetchStatus,
} from '../../reducers/watchlist/watchlistSelectors';

import { setSelectedCoin } from '../../actions/selected';

import { fetchWatchList, removeFromWatchList } from '../../actions/firebase';
import { fetchCoinPriceInfo } from '../../actions/coinPriceInfo';
import { fetchCoinMetaInfo } from '../../actions/coinMetaInfo';

const mapStateToProps = store => {
    return {
        userId: getUserID(store),
        userProfile: getUserProfile(store),
        isAuthorisedUser: getAuthStatus(store),
        isLoading: getLoadingStatus(store),
        userWatchList: getWatchList(store),
        watchListFetchStatus: getWatchListFetchStatus(store),
        watchListErrorMessage: getWatchListErrorMessage(store),
    };
};

const mapDispatchToProps = dispatch => ({
    logon: () => dispatch(signIn()),
    logout: () => dispatch(signOut()),
    fetchUser: () => dispatch(fetchUser()),
    fetchWatchList: uid => dispatch(fetchWatchList(uid)),
    fetchCoinPriceInfo: coinName => dispatch(fetchCoinPriceInfo(coinName)),
    fetchCoinMetaInfo: coinId => dispatch(fetchCoinMetaInfo(coinId)),
    setSelectedCoin: (coinName, coinId) =>
        dispatch(setSelectedCoin(coinName, coinId)),
    removeFromWatchList: (coin, uid) =>
        dispatch(removeFromWatchList(coin, uid)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(Header))
);
