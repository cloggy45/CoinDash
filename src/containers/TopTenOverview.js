import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { addFavourite, fetchTopTen } from '../actions/api';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getTopTen,
  isFetchingTopTenList,
  getErrorMessage,
  getUserId,
  isUserAuthorised
} from '../reducers/rootReducer';

import styleConstants from '../misc/style_constants.js';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  positive: {
    color: '#4CAF50'
  },
  negative: {
    color: '#F44336'
  }
});

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export class TopTenOverview extends Component {
  componentDidMount() {
    this.props.fetch;
  }
  isNegativePercent(percent) {
    return Math.sign(percent) === -1 ? true : false;
  }
  render() {
    const { classes, topTen, isFetching } = this.props;
    if(this.props.authStatus) {
      this.props.addFavourite("THIS IS A TEST", this.props.userUID);
    }
    
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
                    <TableCell numeric>{formatter.format(USD.price)}</TableCell>
                    {this.isNegativePercent(USD.percent_change_24h) ? (
                      <TableCell className={classes.negative} numeric>
                        {USD.percent_change_24h}%
                      </TableCell>
                    ) : (
                      <TableCell className={classes.positive} numeric>
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

function mapStateToProps(store) {
  return {
    authStatus: isUserAuthorised(store),
    userUID: getUserId(store),
    topTen: getTopTen(store),
    isFetching: isFetchingTopTenList(store),
    errorMessage: getErrorMessage(store)
  };
}

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchTopTen()),
  addFavourite: (coin, uid) => dispatch(addFavourite(coin, uid)) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TopTenOverview));
