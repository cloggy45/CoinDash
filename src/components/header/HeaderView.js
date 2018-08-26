import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
        margin: 10
    }
};

const MenuItems = props => {
    return props.items.map((item, index) => {
        return <MenuItem key={index} onClick={props.handleClose}>{item}</MenuItem>
    })
};

export class Header extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
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

    render() {
        const {classes, isAuthorisedUser, userProfile} = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Coin Dash
                        </Typography>
                        <Options className={classes.flex}/>
                        {

                            isAuthorisedUser === true ? (
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
                                    <Button color="inherit" onClick={this.handleLogoutClick}>Log Out</Button>
                                </React.Fragment>
                        ) : (
                            <Button onClick={this.handleLoginClick} color="inherit">Login</Button>)
                        }
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItems onClick={this.handleClose} items={["Hello","World"]}/>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;