import { connect } from 'react-redux';

import { setSelectedCoin } from '../../../actions/selected';

import {
    getCoinList,
    getCoinListFetchStatus,
} from '../../../reducers/coinList/coinListSelectors';

import { fetchCoinPriceInfo } from '../../../actions/coinPriceInfo';

import { withStyles } from '@material-ui/core/styles';

import SearchCurrency, { styles } from './SearchCurrencyView.js';

const mapStateToProps = state => ({
    coinList: getCoinList(state),
    coinListFetchStatus: getCoinListFetchStatus(state),
});

const mapDispatchToProps = dispatch => ({
    setSelectedCoin: (symbol, id) => {
        dispatch(setSelectedCoin(symbol, id));
    },

    fetchCoinPriceInfo: tickers => dispatch(fetchCoinPriceInfo(tickers)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchCurrency));
