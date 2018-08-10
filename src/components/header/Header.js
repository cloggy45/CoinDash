import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';

import Header, {styles} from './HeaderView';

import { signIn, signOut, fetchUser } from '../../actions/auth';

import { isUserAuthorised } from '../../reducers/rootReducer';

const mapStateToProps = state => {
    return {
        authorisedUser : isUserAuthorised(state)
    }
};

const mapDispatchToProps = dispatch => ({
  logon: () => dispatch(signIn()),
  logout: () => dispatch(signOut()),
  fetchUser: () => dispatch(fetchUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));