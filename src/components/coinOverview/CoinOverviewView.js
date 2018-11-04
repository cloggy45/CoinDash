import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import isEmpty from 'lodash.isempty';
import has from 'lodash.has';

import Hero from './Hero';
import Specific from './Specific';
import SelectCurrency from '../header/Selects/SelectFiatCurrency';

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

    getCoinInfomation(propertyName) {
        const {
            coinPriceInfo,
            isFetchingCoinPriceInfo,
            coinPriceHasError,
            selectedCoin,
            selectedFiat,
        } = this.props;

        let content;

        if (!isFetchingCoinPriceInfo && !coinPriceHasError) {
            content =
                coinPriceInfo['DISPLAY'][selectedCoin][selectedFiat][
                    propertyName
                ];
        } else {
            content = "Loading...";
        }

        return content;
    }

    renderButton(link, title) {
        const isDisabled = link === undefined;
        return (
            <Button disabled={isDisabled} variant={'outlined'} href={link}>
                {title}
            </Button>
        );
    }

    renderActions(overview) {
        const {
            watchList,
            selectedCoin,
            isAuthorised,
            uid,
            selectedCoinId,
        } = this.props;
        const isOnWatchList = has(watchList, selectedCoin);

        return (
            <CardActions>
                {this.renderButton(overview.links.reddit, 'Reddit')}
                {this.renderButton(overview.links.twitter, 'Twitter')}
                {this.renderButton(overview.links.facebook, 'Facebook')}
                <SelectCurrency />
                {isAuthorised && (
                    <Button
                        size={'small'}
                        color={'primary'}
                        onClick={() => {
                            if (!isOnWatchList) {
                                this.props.addCoinToWatchList(
                                    selectedCoin,
                                    selectedCoinId,
                                    uid
                                );
                            } else {
                                this.props.removeFromWatchList(
                                    selectedCoin,
                                    uid
                                );
                            }
                        }}
                    >
                        {isOnWatchList ? (
                            <FavoriteIcon />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </Button>
                )}
            </CardActions>
        );
    }

    createOverviewInformation() {
        const { coinMetaInfo } = this.props;

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

        return overview;
    }

    renderSpecificInformation(
        content,
        variant = 'display2',
        headerType = 'h1'
    ) {
        const { isFetchingMetaInfo } = this.props;
        if (isFetchingMetaInfo) {
            return <CircularProgress />;
        } else {
            return (
                <Specific
                    content={content}
                    variant={variant}
                    headerType={headerType}
                    classes={styles.bigAvatar}
                />
            );
        }
    }

    // TODO Refactor
    renderCoinOverview = () => {
        const { selectedCoin, coinList, isFetchingMetaInfo } = this.props;
        let { imageBaseUrl, coinLogoUrl } = this.state;

        if (!isEmpty(coinList)) {
            coinLogoUrl = has(coinList, selectedCoin)
                ? coinList[selectedCoin].ImageUrl
                : 'Loading';
        }

        const overview = this.createOverviewInformation();

        return (
            <Grid container justify={'center'}>
                <Grid
                    item
                    container
                    xs={4}
                    md={2}
                    justify={'center'}
                    alignItems={'center'}
                >
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

                <Grid
                    item
                    container
                    xs={8}
                    md={6}
                    justify={'flex-start'}
                    alignItems={'center'}
                >
                    <Grid item>
                        {this.renderSpecificInformation(this.props.selectedCoin)}
                    </Grid>
                    <Hidden xsDown>
                        <Grid item>{this.renderActions(overview)}</Grid>
                    </Hidden>
                </Grid>
                <Hidden smDown>
                    <Grid
                        item
                        container
                        md={4}
                        alignItems={'center'}
                        justify={'flex-end'}
                    >
                        {this.renderSpecificInformation(
                            `Current Price: ${this.getCoinInfomation('PRICE')}`,
                            'headline'
                        )}
                    </Grid>
                </Hidden>
            </Grid>
        );
    };

    render() {
        const { classes } = this.props;
        const overview = this.createOverviewInformation();
        return (
            <div>
                <Card className={classes.card}>
                    <Grid container spacing={0} alignItems="center">
                        {this.renderCoinOverview()}
                    </Grid>
                </Card>
                <Hidden smUp>
                    <Card className={classes.card}>
                        {this.renderActions(overview)}
                    </Card>
                </Hidden>
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
