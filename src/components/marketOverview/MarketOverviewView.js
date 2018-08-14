import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { formatter } from '../../misc/helpers';

export const styles = {
    root: {
        flexGrow: 1,
        marginTop: '1em'
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

const Overview = props => (
    <Card>
        <CardContent>
            <Typography className={props.classes.title} color="textSecondary">
                {props.title}
            </Typography>
            <Typography variant="headline">
                {props.data}
            </Typography>
        </CardContent>
    </Card>
);

class MarketOverview extends Component {
    componentDidMount() {
        this.props.fetchOverview();
    }

    render() {
        const {classes} = this.props;

        if (this.props.overview !== null) {
            var {active_markets, active_cryptocurrencies, last_updated } = this.props.overview.data;
            const { quotes } = this.props.overview.data;
            console.log(quotes);
            var { total_market_cap, total_volume_24h } = quotes.USD;
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Overview {...this.props} title={"Volume 24 Hour"} data={formatter.format(total_market_cap)}/>
                    </Grid>
                    <Grid item xs>
                        <Overview {...this.props} title={"Market Cap"} data={active_markets}/>
                    </Grid>
                    <Grid item xs>
                        <Overview {...this.props} title={"Circulating Supply"} data={active_cryptocurrencies}/>
                    </Grid>
                    <Grid item xs>
                        <Overview {...this.props} title={"Total Supply"} data={formatter.format(total_volume_24h)}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default MarketOverview