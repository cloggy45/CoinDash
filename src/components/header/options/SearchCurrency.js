import { connect } from 'react-redux';

import { setSelectedCoin } from '../../../actions/selected';

import {
    getCoinList,
    getCoinListFetchStatus,
} from '../../../reducers/coinList/coinListSelectors';

import { fetchCoinPriceInfo } from '../../../actions/coinPriceInfo';

import { withStyles } from '@material-ui/core/styles';

import SearchCurrency, { styles } from './SearchCurrencyView.js';
import { getSelectedCryptoCoin, getSelectedFiatCurrency } from '../../../reducers/rootReducer';

const mapStateToProps = state => ({
    coinList: getCoinList(state),
    selectedCrypto: getSelectedCryptoCoin(state),
    selectedFiat: getSelectedFiatCurrency(state),
    coinListFetchStatus: getCoinListFetchStatus(state),
});

const mapDispatchToProps = dispatch => ({
    setSelectedCoin: (symbol, id) => {
        dispatch(setSelectedCoin(symbol, id));
    },

    fetchCoinPriceInfo: (cryptoSymbol, fiatSymbol) =>
        dispatch(fetchCoinPriceInfo(cryptoSymbol, fiatSymbol)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchCurrency));
