import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


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
};

class Header extends Component {
  
    handleLoginClick = () => {
        this.props.logon();
    };

    handleLogoutClick = () => {
        this.props.logout();
    };

  render() {
  const { classes, authorisedUser } = this.props;
    return (
     <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Coin Dash
            </Typography>
            
            { authorisedUser === true ? ( 
              <Button color="inherit" onClick={this.handleLogoutClick}>Log Out</Button>
    ) : (<Button onClick={this.handleLoginClick} color="inherit">Login</Button>)
           }
              
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;