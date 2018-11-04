import { connect } from 'react-redux';
import { fetchPaginatedCoinList } from '../../actions/api';
import { withStyles } from '@material-ui/core/styles';
import CustomPaginationActionsTable, { styles } from './coinListOverviewView';

import {
    getCoinList,
    isFetchingCoinListSegment,
    getErrorMessage,
} from '../../reducers/topTen/topTenSelectors';
import { getSelectedCryptoCoin, getSelectedFiatCurrency } from '../../reducers/rootReducer';

function mapStateToProps(store) {
    return {
        selectedFiat: getSelectedFiatCurrency(store),
        selectedCrypto: getSelectedCryptoCoin(store),
        coinListSegment: getCoinList(store),
        isFetching: isFetchingCoinListSegment(store),
        errorMessage: getErrorMessage(store),
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCoinList: (start, limit, sort, fiat) =>
        dispatch(fetchPaginatedCoinList(start, limit, sort, fiat)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CustomPaginationActionsTable));
