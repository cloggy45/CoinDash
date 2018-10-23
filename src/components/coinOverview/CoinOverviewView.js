import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import isEmpty from 'lodash.isempty';
import has from 'lodash.has';

import Hero from './Hero';
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

class CoinOverview extends React.Component {
    state = {
        imageBaseUrl: 'https://www.cryptocompare.com',
        coinLogoUrl: '',
    };

    componentDidMount() {
        this.props.fetchCoinMetaInfo(this.props.selectedCoinId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedCoinId !== this.props.selectedCoinId) {
            this.props.fetchCoinMetaInfo(this.props.selectedCoinId);

            const { ImageUrl } = this.props.coinList[this.props.selectedCoin];

            this.setState({ coinLogoUrl: ImageUrl });
        }
    }

    renderCoinInfomation(propertyName) {
        const {
            coinPriceInfo,
            isFetchingCoinPriceInfo,
            coinPriceErrorMessage,
            coinPriceHasError,
            selectedCoin,
        } = this.props;

        let content;

        if (!isFetchingCoinPriceInfo && !coinPriceHasError) {
            content =
                coinPriceInfo['DISPLAY'][selectedCoin]['USD'][propertyName];
        } else {
            content = coinPriceErrorMessage;
        }

        return (
            <Specific
                content={content}
                variant={'display1'}
                headerType={'h2'}
            />
        );
    }

    renderButton(link, title) {
        const isDisabled = link === undefined;
        return (
            <Button
                disabled={isDisabled}
                variant={'outlined'}
                size="small"
                href={link}
            >
                {title}
            </Button>
        );
    }

    // TODO Refactor
    renderCoinOverview = () => {
        const {
            uid,
            isAuthorised,
            coinMetaInfo,
            selectedCoin,
            selectedCoinId,
            coinList,
            isFetchingMetaInfo,
            watchList,
        } = this.props;
        let { imageBaseUrl, coinLogoUrl } = this.state;

        if (!isEmpty(coinList)) {
            coinLogoUrl = has(coinList, selectedCoin)
                ? coinList[selectedCoin].ImageUrl
                : 'Loading';
        }

        const overview = {
            name: '',
            links: {
                facebook: '',
                reddit: '',
                twitter: '',
            },
        };

        if (!isEmpty(coinMetaInfo)) {
            overview.symbol = coinMetaInfo.General.Name;
            overview.name = coinMetaInfo.General.CoinName;
            overview.links.facebook = coinMetaInfo.Facebook.link;
            overview.links.reddit = coinMetaInfo.Reddit.link;
            overview.links.twitter = coinMetaInfo.Twitter.link;
        }
        return (
            <Grid container justify={'center'}>
                <Grid item xs={2} justify={'center'} alignItems={'center'}>
                    {isFetchingMetaInfo ? (
                        <CircularProgress />
                    ) : (
                        <Hero
                            alt={'logo'}
                            src={imageBaseUrl + coinLogoUrl}
                            height={100}
                            width={100}
                        />
                    )}
                </Grid>
                <Grid item xs={4}>
                    {isFetchingMetaInfo ? (
                        <CircularProgress />
                    ) : (
                        <Specific
                            content={overview.name}
                            variant={'display2'}
                            headerType={'h1'}
                            classes={styles.bigAvatar}
                        />
                    )}
                    <CardActions>
                        {this.renderButton(overview.links.reddit, 'Reddit')}
                        {this.renderButton(overview.links.twitter, 'Twitter')}
                        {this.renderButton(overview.links.facebook, 'Facebook')}

                        {isAuthorised && (
                            <Button
                                size="small"
                                disabled={has(watchList, selectedCoin)}
                                variant={'contained'}
                                color={'primary'}
                                onClick={() =>
                                    this.props.addCoinToWatchList(
                                        selectedCoin,
                                        selectedCoinId,
                                        uid
                                    )
                                }
                            >
                                Add to Watchlist
                            </Button>
                        )}
                    </CardActions>
                </Grid>
                <Grid
                    item
                    xs={5}
                    alignItems={'center'}
                    container
                    justify={'flex-end'}
                >
                    {this.renderCoinInfomation('PRICE')}
                </Grid>
            </Grid>
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <Grid container spacing={0} alignItems="center">
                        {this.renderCoinOverview()}
                    </Grid>
                </Card>
            </div>
        );
    }
}

CoinOverview.propTypes = {
    uid: PropTypes.string,
    isAuthorised: PropTypes.bool,
    classes: PropTypes.object,
    selectedCoinId: PropTypes.number,
    coinMetaInfo: PropTypes.object,
    isFetchingMetaInfo: PropTypes.bool,
};

CoinOverview.defaultProps = {
    uid: '',
    isAuthorised: false,
    classes: {},
    selectedCoin: 'DOGE',
    selectedCoinId: 4432,
    coinMetaInfo: {},
    isFetchingMetaInfo: true,
};

export default CoinOverview;
