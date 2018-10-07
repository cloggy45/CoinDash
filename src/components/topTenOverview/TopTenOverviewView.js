import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

export const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    positive: {
        color: '#4CAF50',
    },
    negative: {
        color: '#F44336',
    },
});

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

export class TopTenOverview extends Component {
    componentDidMount() {
        this.props.fetch();
    }
    static isNegativePercent(percent) {
        return Math.sign(percent) === -1;
    }
    render() {
        const { classes, topTen, isFetching } = this.props;

        if (isFetching || topTen.length === 0) {
            return <CircularProgress className={classes.progress} />;
        } else {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell numeric>Value</TableCell>
                                <TableCell numeric>Change (24 Hour)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topTen.map(element => {
                                const { USD } = element.quotes;
                                return (
                                    <TableRow key={element.id}>
                                        <TableCell component="th" scope="row">
                                            {element.rank}
                                        </TableCell>
                                        <TableCell>{element.name}</TableCell>
                                        <TableCell numeric>
                                            {formatter.format(USD.price)}
                                        </TableCell>
                                        {TopTenOverview.isNegativePercent(
                                            USD.percent_change_24h
                                        ) ? (
                                            <TableCell
                                                className={classes.negative}
                                                numeric
                                            >
                                                {USD.percent_change_24h}%
                                            </TableCell>
                                        ) : (
                                            <TableCell
                                                className={classes.positive}
                                                numeric
                                            >
                                                {USD.percent_change_24h}%
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
    }
}

TopTenOverview.propTypes = {
    topTen: PropTypes.array,
    isFetching: PropTypes.bool,
    classes: PropTypes.object,
};

TopTenOverview.defaultProps = {
    topTen: [],
    isFetching: true,
    classes: {},
};
export default TopTenOverview;
