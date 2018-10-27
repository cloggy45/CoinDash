import { connect } from 'react-redux';
import { fetchPaginatedCoinList } from '../../actions/api';
import { withStyles } from '@material-ui/core/styles';
import CustomPaginationActionsTable, { styles } from './coinListOverviewView';

import {
    getCoinList,
    isFetchingCoinListSegment,
    getErrorMessage,
} from '../../reducers/topTen/topTenSelectors';

function mapStateToProps(store) {
    return {
        coinListSegment: getCoinList(store),
        isFetching: isFetchingCoinListSegment(store),
        errorMessage: getErrorMessage(store),
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCoinList: (start, limit) => dispatch(fetchPaginatedCoinList(start, limit)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CustomPaginationActionsTable));
