import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { fetchTopTen } from '../actions/api';

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
  getErrorMessage
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
  }
});

export class TopTenOverview extends Component {
  componentDidMount() {
    this.props.fetch;
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
                    <TableCell numeric>{USD.price}</TableCell>
                    <TableCell numeric>{USD.percent_change_24h}</TableCell>
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
    topTen: getTopTen(store),
    isFetching: isFetchingTopTenList(store),
    errorMessage: getErrorMessage(store)
  };
}

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchTopTen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TopTenOverview));
