import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import has from 'lodash.has';
import foreach from 'lodash.foreach';

export const styles = {
    root: {
        flexGrow: 1,
        marginTop: '1em',
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

// TODO Move into own file
const Overview = props => (
    <Card>
        <CardContent>
            <Typography className={props.classes.title} color="textSecondary">
                {props.title}
            </Typography>
            <Typography variant="headline">{props.data}</Typography>
        </CardContent>
    </Card>
);

class MarketOverview extends Component {
    componentDidMount() {
        this.props.fetchCoinOverview('DOGE');
    }

    render() {
        const {
            classes,
            coinPriceInfo,
            isFetchingCoinPriceInfo,
            selectedCoin,
        } = this.props;

        const error = 'No Info Available...';
        const priceInformation = new Map();

        if (!isFetchingCoinPriceInfo) {
            if (has(coinPriceInfo, 'DISPLAY')) {
                foreach(
                    coinPriceInfo['DISPLAY'][selectedCoin]['USD'],
                    (value, key) => {
                        priceInformation.set(key, value);
                    }
                );
            } else {
            }
        }

        // TODO refactor
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Overview
                            {...this.props}
                            title={'Volume 24 Hour'}
                            data={
                                priceInformation.get('TOTALVOLUME24H') || error
                            }
                        />
                    </Grid>
                    <Grid item xs>
                        <Overview
                            {...this.props}
                            title={'Market Cap'}
                            data={priceInformation.get('MKTCAP') || error}
                        />
                    </Grid>
                    <Grid item xs>
                        <Overview
                            {...this.props}
                            title={'Supply'}
                            data={priceInformation.get('SUPPLY') || error}
                        />
                    </Grid>
                    <Grid item xs>
                        <Overview
                            {...this.props}
                            title={'Highest Price (Today)'}
                            data={priceInformation.get('HIGHDAY') || error}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

MarketOverview.propTypes = {
    classes: PropTypes.object,
    overview: PropTypes.object,
    fetchOverview: PropTypes.func,
};

MarketOverview.defaultProps = {
    classes: {},
    overview: {},
    fetchOverview: () => {},
};

export default MarketOverview;
