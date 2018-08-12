import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
            <Typography>
                {props.data}
            </Typography>
        </CardContent>
    </Card>
);

class MarketOverview extends Component {
    render() {
        const {classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Overview {...this.props} title={"Total Market Cap"}/>
                    </Grid>
                    <Grid item xs>
                        <Overview {...this.props} title={"Active Markets"}/>
                    </Grid>
                    <Grid item xs>
                        <Overview {...this.props} title={"Active Currencies"}/>
                    </Grid>
                    <Grid item xs>
                        <Overview {...this.props} title={"Total 24 Volume"}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default MarketOverview