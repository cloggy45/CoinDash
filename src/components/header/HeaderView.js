import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

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

class Header extends Component {

    handleLoginClick = () => {
        this.props.logon();
    };

    handleLogoutClick = () => {
        this.props.logout();
    };

    render() {
        const {classes, isAuthorisedUser, userProfile} = this.props;
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

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;