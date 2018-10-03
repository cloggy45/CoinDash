import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

export const styles = {
    card: {
        marginTop: '1em',
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
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 100,
        height: 100,
    },
};

const Hero = props => (
    <CardContent>
        <Avatar
            alt={props.alt}
            src={props.src}
            className={props.classes}
        />
    </CardContent>
);

const Title = props => (
    <CardContent>
        <Typography variant={props.variant} component={props.headerType}>
            {props.title}
        </Typography>
    </CardContent>
);

const Menu = props => (
    <CardActions>
        <Button size="small" href={props.website}>Website</Button>
        <Button size="small" href={props.reddit}>Reddit</Button>
        <Button size="small" href={props.twitter}>Twitter</Button>
        <Button size="small" href={props.facebook}>Facebook</Button>
        {
            props.isAuthorised &&
            <Button size="small"
                    onClick={() => props.addCoinToWatchList(props.selectedCoin, props.uid)}>Add
                to Watchlist</Button>
        }
    </CardActions>
);

const Price = props => (
    <CardContent>
        <Typography variant="display1" component="h2">
            {props.value}
        </Typography>
    </CardContent>
)

class CoinOverview extends React.Component {
    componentDidMount() {
        this.props.fetchCoinMetaInfo(4432);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedCoin !== this.props.selectedCoin) {
            this.props.fetchCoinMetaInfo(4432);
        }
    }

    renderCoinOverview = () => {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Grid container spacing={0} alignItems="center" justify={"flex-start"}>
                        <Grid item xs={2}>
                            <Hero alt={"logo"} src={"https://via.placeholder.com/350x150"}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                          direction="column"
                          justify="space-around"
                          alignItems="baseline">
                        <Grid item xs>

                            <Title variant={"display1"} headerType={"h2"} classes={styles.bigAvatar}/>
                            <Menu/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={0} alignItems="center" justify={"flex-end"}>
                        <Grid item xs>
                            <Price value={"$100"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    };

    render() {
        const {classes, uid, isAuthorised, isFetchingMetaInfo} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <Grid container spacing={0} alignItems="center">
                        {
                            isFetchingMetaInfo ? <CircularProgress/> : this.renderCoinOverview()
                        }
                    </Grid>
                </Card>
            </div>
        )
    }
}

CoinOverview.propTypes = {
    uid: PropTypes.string,
    isAuthorised: PropTypes.bool,
    classes: PropTypes.object,
    selectedCoin: PropTypes.string,
    coinMetaInfo: PropTypes.object,
    isFetchingMetaInfo: PropTypes.bool
};

CoinOverview.defaultProps = {
    uid: '',
    isAuthorised: false,
    classes: {},
    selectedCoin: "BTC",
    coinMetaInfo: {},
    isFetchingMetaInfo: true
}


export default CoinOverview;