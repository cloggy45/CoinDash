import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Header, { styles } from './HeaderView';

import { signIn, fetchUser } from '../../actions/auth';

import {
    getAuthStatus,
    getAuthLoadingStatus,
    getUserProfile,
    getUserID,
} from '../../reducers/auth/authSelectors';

const mapStateToProps = store => {
    return {
        userId: getUserID(store),
        userProfile: getUserProfile(store),
        isAuthorisedUser: getAuthStatus(store),
        isLoading: getAuthLoadingStatus(store),
    };
};

const mapDispatchToProps = dispatch => ({
    logon: () => dispatch(signIn()),
    fetchUser: () => dispatch(fetchUser()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(Header))
);
