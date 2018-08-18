import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

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

function CoinOverview (props) {
    const {classes, uid, isAuthorised } = props;

    return (
        <div>
            <Card className={classes.card}>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={0} alignItems="center" justify={"flex-start"}>
                            <Grid item xs={2}>
                            <CardContent>
                                <Avatar
                                    alt="Adelle Charles"
                                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                                    className={classes.bigAvatar}
                                />
                            </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container
                              direction="column"
                              justify="space-around"
                              alignItems="baseline">
                            <Grid item xs>
                                <CardContent>
                                    <Typography variant="display1" component="h2">
                                        Bitcoin
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Website</Button>
                                    <Button size="small">Explorer</Button>
                                    <Button size="small">Reddit</Button>
                                    <Button size="small">Twitter</Button>
                                    {
                                        isAuthorised &&  <Button size="small" onClick={() => props.addCoinToWatchList('BTC', uid )}>Add to Watchlist</Button>
                                    }
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container spacing={0} alignItems="center" justify={"flex-end"}>
                            <Grid item xs>
                                <CardContent>
                                    <Typography variant="display1" component="h2">
                                        $6247.59772423
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*<Grid item xs={1}>*/}
                        {/*<Grid container spacing={0} alignItems="center" justify={"flex-start"}>*/}
                            {/*<CardContent>*/}
                                {/*<Typography variant="display1" component="h2">*/}
                                    {/*0.52%*/}
                                {/*</Typography>*/}
                            {/*</CardContent>*/}
                        {/*</Grid>*/}
                    {/*</Grid>*/}

                </Grid>
            </Card>
        </div>
    )
}

export default CoinOverview;