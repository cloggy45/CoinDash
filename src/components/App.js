import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Components
import Header from './header/Header';
import MarketOverview from './marketOverview/MarketOverview';
import TopTenOverview from './coinListOverview/coinListOverview';
import CoinOverview from './coinOverview/CoinOverview';

import Graph from './graph/Graph';

// Actions
import { fetchUser } from '../actions/auth';
import { fetchCoinList } from '../actions/api';

const styles = {
    container: {
        margin: '0em 7em',
    },
};

class App extends Component {
    componentDidMount() {
        this.props.fetchCoinList();
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <ToastContainer autoClose={1500} position={"bottom-right"} />
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={12}>
                        <CoinOverview />
                    </Grid>
                    <Grid item xs={12}>
                        <MarketOverview />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Graph
                            title={'Highest Price'}
                            filter={'high'}
                            graphType={'Bar'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Graph
                            title={'Lowest Price'}
                            filter={'low'}
                            graphType={'Line'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Switch>
                            <Route exact path="/" component={TopTenOverview} />
                        </Switch>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUser: dispatch(fetchUser()),
    fetchCoinList: () => dispatch(fetchCoinList()),
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(withStyles(styles)(App))
);
