import React, { Component } from 'react';
import { connect, compose } from 'react-redux';
import { addFavourite, fetchTopTen } from '../../actions/api';
import { withStyles } from '@material-ui/core/styles';
import TopTenOverview, { styles } from './TopTenOverviewView';

import {
  getTopTen,
  isFetchingTopTenList,
  getErrorMessage,
} from '../../reducers/rootReducer';

function mapStateToProps(store) {
  return {
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