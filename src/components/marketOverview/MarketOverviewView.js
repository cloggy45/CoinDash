import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';

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

    renderPriceInformation(title, propertyOnResponseObject) {
        const {
            coinPriceInfo,
            isFetchingCoinPriceInfo,
            coinPriceHasError,
            coinPriceErrorMessage,
            selectedCoin,
        } = this.props;

        let data;

        if (!isFetchingCoinPriceInfo && !coinPriceHasError) {
            data =
                coinPriceInfo['DISPLAY'][selectedCoin]['USD'][
                    propertyOnResponseObject
                ];
        } else {
            data = coinPriceErrorMessage;
        }

        return <Overview {...this.props} title={title} data={data} />;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden smUp>
                    <Grid item xs={12}>
                        {this.renderPriceInformation('Price', 'PRICE' )}
                    </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        {this.renderPriceInformation(
                            'Volume (24 Hours)',
                            'VOLUME24HOUR'
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderPriceInformation('Market Cap', 'MKTCAP')}
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderPriceInformation('Supply', 'SUPPLY')}
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderPriceInformation(
                            'Highest Price (Today)',
                            'HIGHDAY'
                        )}
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
