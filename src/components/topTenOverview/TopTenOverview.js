import { connect } from 'react-redux';
import { fetchTopTen } from '../../actions/api';
import { withStyles } from '@material-ui/core/styles';
import TopTenOverview, { styles } from './TopTenOverviewView';

import {
  getTopTen,
  isFetchingTopTenList,
  getErrorMessage,
} from '../../reducers/topTen/topTenSelectors';

function mapStateToProps(store) {
  return {
    topTen: getTopTen(store),
    isFetching: isFetchingTopTenList(store),
    errorMessage: getErrorMessage(store)
  };
}

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchTopTen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TopTenOverview));