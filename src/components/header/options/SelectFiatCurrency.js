import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { setSelectedCurrency } from '../../../actions/selected';
import {
    getSelectedCryptoCoin,
    getSelectedFiatCurrency,
} from '../../../reducers/rootReducer';

import SelectCurrency, { styles } from './SelectFiatCurrencyView';
import { fetchCoinPriceInfo } from '../../../actions/coinPriceInfo';

const mapStateToProps = store => ({
    selectedFiat: getSelectedFiatCurrency(store),
    selectedCrypto: getSelectedCryptoCoin(store),
});

const mapDispatchToProps = dispatch => ({
    setSelectedCurrency: currency => dispatch(setSelectedCurrency(currency)),
    fetchCoinPriceInfo: (cryptoTicker, fiatTicker) =>
        dispatch(fetchCoinPriceInfo(cryptoTicker, fiatTicker)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SelectCurrency));
