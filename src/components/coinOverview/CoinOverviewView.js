import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

import isEmpty from 'lodash.isempty';

import Hero from './Hero';
import Price from './Price';
import Specific from './Specific';


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


// TODO Add Specifics into their relative place
class CoinOverview extends React.Component {
    state = {
        imageBaseUrl : 'https://www.cryptocompare.com',
        coinLogoUrl : ""
    };

    componentDidMount() {
        this.props.fetchCoinMetaInfo(this.props.selectedCoinId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedCoinId !== this.props.selectedCoinId) {
            this.props.fetchCoinMetaInfo(this.props.selectedCoinId);

            const { ImageUrl } = this.props.coinList[this.props.selectedCoin];

            this.setState({ coinLogoUrl: ImageUrl })

        }
    }

    renderCoinOverview = () => {
        const {uid, isAuthorised, coinMetaInfo, selectedCoin} = this.props;
        const { imageBaseUrl, coinLogoUrl } = this.state;

        const overview = {
            name: "",
            links: {
                'facebook': "",
                'reddit': "",
                'twitter': ""
            }
        };

        if(!isEmpty(coinMetaInfo)) {
            overview.symbol = coinMetaInfo.General.Name;
            overview.name = coinMetaInfo.General.CoinName;
            overview.links.facebook = coinMetaInfo.Facebook.link;
            overview.links.reddit = coinMetaInfo.Reddit.link;
            overview.links.twitter = coinMetaInfo.Twitter.link;
        }

        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Grid container spacing={0} alignItems="center" justify={"flex-start"}>
                        <Grid item xs={2}>
                            <Hero alt={"logo"} src={imageBaseUrl+coinLogoUrl}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                          direction="column"
                          justify="space-around"
                          alignItems="baseline">
                        <Grid item xs>
                            <Specific content={overview.name} variant={"display1"} headerType={"h1"} classes={styles.bigAvatar}/>
                            <Specific content={overview.symbol} variant={"display5"} headerType={"h3"} classes={styles.bigAvatar}/>

                            <CardActions>
                                <Button size="small" href={overview.links.reddit}>Reddit</Button>
                                <Button size="small" href={overview.links.twitter}>Twitter</Button>
                                <Button size="small" href={overview.links.facebook}>Facebook</Button>
                                {
                                    isAuthorised &&
                                    <Button size="small"
                                            onClick={() => this.props.addCoinToWatchList(selectedCoin, uid)}>Add
                                        to Watchlist</Button>
                                }
                            </CardActions>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={0} alignItems="center" justify={"flex-end"}>
                        <Grid item xs>
                            <Specific content={"$100"} variant={"display1"} headerType={"h2"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    };

    render() {
        const {classes, isFetchingMetaInfo} = this.props;
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
    selectedCoinId: PropTypes.string,
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
};


export default CoinOverview;