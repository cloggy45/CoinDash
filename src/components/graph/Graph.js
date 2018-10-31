import Graph, { styles } from './GraphView';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    getCoinHistory,
    getError,
    getLoadingStatus,
} from '../../reducers/coinHistory/coinHistorySelectors';
import {
    getSelectedCryptoCoin,
    getSelectedFiatCurrency,
} from '../../reducers/rootReducer';
import { fetchCoinHistory } from '../../actions/api';

const mapStateToProps = store => {
    return {
        coinHistory: getCoinHistory(store),
        error: getError(store),
        isLoading: getLoadingStatus(store),
        selectedCryptoTicker: getSelectedCryptoCoin(store),
        selectedFiatTicker: getSelectedFiatCurrency(store),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCoinHistory: (cryptoTicker, fiatTicker) =>
            dispatch(fetchCoinHistory(cryptoTicker, fiatTicker)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Graph));
