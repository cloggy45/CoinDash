import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import Options from './Selects/SearchCurrency';

import Hidden from '@material-ui/core/Hidden';
import MainMenu from './MainMenu/MainMenu';
import WatchListMenu from './WatchListMenu/WatchListMenu';

export const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    avatar: {
        margin: 10,
    },
};

export class Header extends Component {
    state = {
        anchorEl: null,
    };

    handleLoginClick = async () => {
        this.props.logon();
    };

    renderLoggedOutMenu = () => (
        <Button onClick={this.handleLoginClick} color="inherit" name="Login">
            Login
        </Button>
    );

    renderLoggedInMenu = () => {
        const { userProfile, classes } = this.props;
        return (
            <React.Fragment>
                <WatchListMenu />
                <MainMenu
                    avatar={userProfile.profile.picture}
                    classes={classes.avatar}
                />
            </React.Fragment>
        );
    };

    renderLogo() {
        const { classes } = this.props;
        return (
            <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
            >
                Coin Dash
            </Typography>
        );
    }

    render() {
        const { classes, isAuthorisedUser } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {this.renderLogo()}
                        <Hidden xsDown>
                            <Options className={classes.flex} />
                        </Hidden>
                        {isAuthorisedUser === true
                            ? this.renderLoggedInMenu()
                            : this.renderLoggedOutMenu()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    isAuthorisedUser: PropTypes.bool,
    classes: PropTypes.object,
    userProfile: PropTypes.object,
    watchListErrorMessage: PropTypes.string,
    watchListFetchStatus: PropTypes.bool,
    userWatchList: PropTypes.object,
    logout: PropTypes.func,
    logon: PropTypes.func,
    fetchUser: PropTypes.func,
    fetchWatchList: PropTypes.func,
};

Header.defaultProps = {
    isAuthorisedUser: false,
    classes: {},
    userProfile: {},
    watchListErrorMessage: '',
    watchListFetchStatus: true,
    userWatchList: {},
    logout: () => {},
    logon: () => {},
    fetchUser: () => {},
    fetchWatchList: () => {},
};

export default Header;
