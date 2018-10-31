import React from 'react';
import map from 'lodash.map';
import isEmpty from 'lodash.isempty';

import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import RemoveCircle from '@material-ui/icons/RemoveCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const WatchListItems = props => {
    let {
        items,
        handlerLoadCoinDashboard,
        userId,
        handlerRemoveFromWatchList,
        selectedFiat,
    } = props;

    if (isEmpty(items)) {
        return (
            <MenuItem onClick={() => {}}>
                <ListItemText>Nothing added</ListItemText>
            </MenuItem>
        );
    } else {
        return map(items, (coinId, coinName) => {
            return (
                <MenuItem key={coinId} id={coinId}>
                    <ListItemText
                        onClick={() =>
                            handlerLoadCoinDashboard(
                                coinName,
                                coinId,
                                selectedFiat
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
                        <RemoveCircle />
                    </ListItemIcon>
                </MenuItem>
            );
        });
    }
};

export default WatchListItems;
