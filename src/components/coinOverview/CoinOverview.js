import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import CoinOverview, {styles} from './CoinOverviewView';

import { addToWatchList} from '../../actions/firebase';
import { getUserID, getAuthStatus } from '../../reducers/auth/authSelectors';
import { getFetchStatus, getCoinMetaInfo } from '../../reducers/coinMetaInfo/coinMetaInfoSelectors';

const mapStateToProps = store => {
    return {
        uid : getUserID(store),
        isAuthorised : getAuthStatus(store)
    }
};

const mapDispatchToProps = dispatch => ({
    addCoinToWatchList : (coin, uid) => dispatch(addToWatchList(coin, uid))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CoinOverview)));