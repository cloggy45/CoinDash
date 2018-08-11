import React, { Component, StrictMode } from 'react';
import { render } from 'react-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { fetchCoinData } from '../actions/api';
import { fetchUser } from '../actions/auth';
import styleConstants from '../misc/style_constants.js';
import { withRouter } from 'react-router-dom';

import {
  Switch,
  Route
} from 'react-router-dom';

import { bindActionCreators } from 'redux';

import Header from '../components/header/Header';
import Overview from '../components/Overview';
import Panel from '../components/Panel';
import TopTenOverview from './topTenOverview/TopTenOverview';
import { history } from '../history';

import Graph from '../containers/graph/Graph'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={TopTenOverview} />
          <Route exact path="/logout" render={() => <h1>Logout</h1>} />
          <Route exact path="/favourites" render={() => <h1>Favourites</h1>} />
        </Switch>
      <Graph filter={"close"} graphType={"bar"} />
      </React.Fragment>
    );
  }
};
  
const mapDispatchToProps = dispatch => ({
  fetchUser: dispatch(fetchUser())
})
  
export default withRouter(
  connect(
    null, 
    mapDispatchToProps,
  )(App)
);
