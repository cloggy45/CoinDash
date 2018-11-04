import React from 'react';
import map from 'lodash.map';
import isEmpty from 'lodash.isempty';

import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

class WatchListMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    componentDidMount() {
        this.props.fetchWatchList(this.props.userId);
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        let {
            handlerLoadCoinDashboard,
            userId,
            handlerRemoveFromWatchList,
            selectedFiat,
            userWatchList,
        } = this.props;
        let menuItems;


        if (isEmpty(userWatchList)) {
            menuItems = <MenuItem onClick={() => {}}>
                <ListItemText>Nothing added</ListItemText>
                    </MenuItem>;
        } else {
            menuItems = map(userWatchList, (coinId, coinName) => {
                return (
                    <MenuItem key={coinId} id={coinId}>
                        <ListItemText
                            onClick={() =>
                                handlerLoadCoinDashboard(
                                    coinName,
                                    coinId,
                                    selectedFiat,
                                )
                            }
                        >
                            {coinName}
                        </ListItemText>
                        <ListItemIcon
                            onClick={() =>
                                handlerRemoveFromWatchList(coinName, userId)
                            }
                        >
                            <RemoveCircle/>
                        </ListItemIcon>
                    </MenuItem>
                );
            });
        };

        return (
            <React.Fragment>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {menuItems}
                </Menu>
            </React.Fragment>
        );
    }
}

export default WatchListMenu;
