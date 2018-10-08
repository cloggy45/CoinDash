import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import Options from './options/SearchCurrency';

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

export const MenuItems = props => {
    let { items, clickHandler } = props;
    if (items.length === 1) {
        clickHandler = () => {};
    }

    return items.map((item, index) => {
        return (
            <MenuItem
                key={index}
                id={item}
                onClick={event => clickHandler(event)}
            >
                {item}
            </MenuItem>
        );
    });
};

export class Header extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
        this.props.fetchWatchList(this.props.userId);
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLoginClick = () => {
        this.props.logon();
    };

    handleLogoutClick = () => {
        this.props.logout();
    };

    renderLoggedOutMenu = () => (
        <Button onClick={this.handleLoginClick} color="inherit" name="Login">
            Login
        </Button>
    );

    renderLoggedInMenu = () => {
        const { userProfile, classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <React.Fragment>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="inherit"
                >
                    View Watchlist
                </Button>
                <Avatar
                    alt="Users Icon"
                    src={userProfile.profile.picture}
                    className={classes.avatar}
                />
                <Button
                    color="inherit"
                    onClick={this.handleLogoutClick}
                    name="logout"
                >
                    Log Out
                </Button>
            </React.Fragment>
        );
    };

    handleMenuItemClick = event => {
        const selectedCoin = event.target.attributes.id.value;
        this.props.removeFromWatchList(selectedCoin, this.props.userId);
    };

    render() {
        const { classes, isAuthorisedUser, userWatchList } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            Coin Dash
                        </Typography>
                        <Options className={classes.flex} />
                        {isAuthorisedUser === true
                            ? this.renderLoggedInMenu()
                            : this.renderLoggedOutMenu()}
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItems
                                clickHandler={this.handleMenuItemClick}
                                items={
                                    isEmpty(userWatchList)
                                        ? ['Nothing added to watchlist...']
                                        : Object.values(userWatchList)
                                }
                            />
                        </Menu>
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
