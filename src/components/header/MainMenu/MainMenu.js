import { connect } from 'react-redux';

import MainMenu from './MainMenuView';
import { signOut } from '../../../actions/auth';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(signOut()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenu);
