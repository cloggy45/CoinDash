import React, {Component, StrictMode} from 'react';
import {connect} from 'react-redux';

import {fetchUser} from '../actions/auth';
import {withRouter} from 'react-router-dom';

import {
    Switch,
    Route
} from 'react-router-dom';


import Header from '../components/header/Header';
import MarketOverview from '../containers/marketOverview/MarketOverview';

import TopTenOverview from './topTenOverview/TopTenOverview';
import Grid from '@material-ui/core/Grid';

import Graph from '../containers/graph/Graph'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <MarketOverview/>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Graph title={'Highest Price'} filter={"high"} graphType={"bar"}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Graph title={'Lowest Price'} filter={"low"} graphType={"line"}/>
                    </Grid>
                </Grid>
                <Switch>
                    <Route exact path="/" component={TopTenOverview}/>
                    <Route exact path="/logout" render={() => <h1>Logout</h1>}/>
                    <Route exact path="/favourites" render={() => <h1>Favourites</h1>}/>
                </Switch>
            </React.Fragment>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    fetchUser: dispatch(fetchUser())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(App)
);
