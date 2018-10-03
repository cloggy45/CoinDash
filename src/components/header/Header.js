import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import Header, {styles} from './HeaderView';

import {signIn, signOut, fetchUser} from '../../actions/auth';

import {getAuthStatus, getLoadingStatus, getUserProfile} from '../../reducers/auth/authSelectors';

import {fetchWatchList} from '../../actions/firebase';

const mapStateToProps = store => {
    return {
        userProfile: getUserProfile(store),
        isAuthorisedUser: getAuthStatus(store),
        isLoading: getLoadingStatus(store)
    }
};

const mapDispatchToProps = dispatch => ({
    logon: () => dispatch(signIn()),
    logout: () => dispatch(signOut()),
    fetchUser: () => dispatch(fetchUser()),
    fetchWatchList: (uid) => dispatch(fetchWatchList(uid))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));