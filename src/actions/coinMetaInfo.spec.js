import {fetchCoinMetaInfo} from './coinMetaInfo';

import {
    FETCH_COIN_META_INFO_FAILED,
    FETCH_COIN_META_INFO_REQUEST,
    FETCH_COIN_META_INFO_SUCCESS
} from './actionTypes';

import {
    mock, mockStore
} from './setupAsyncTests';

describe('coinMetaInfo actions', () => {
    let store = mockStore({coinOverview: []});

    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    afterAll(() => {
        mock.restore();
    });

    const corsProxy = "https://cors-anywhere.herokuapp.com/";

    const url = corsProxy+"https://www.cryptocompare.com/api/data/socialstats/?id=1182";
    const payload = [

        {
            "Response": "Success",
            "Message": "Social data successfully returned",
            "Type": 100,
            "Data": {
                "General": {
                    "Name": "BTC",
                    "CoinName": "Bitcoin",
                    "Type": "Webpagecoinp",
                    "Points": 344868
                },
                "CryptoCompare": {
                    "SimilarItems": [{
                        "Id": 4432,
                        "Name": "Dogecoin",
                        "FullName": "Dogecoin (DOGE)",
                        "ImageUrl": "/media/19684/doge.png",
                        "Url": "/coins/doge/",
                        "FollowingType": 1
                    }, {
                        "Id": 3808,
                        "Name": "Litecoin",
                        "FullName": "Litecoin (LTC)",
                        "ImageUrl": "/media/19782/ltc.png",
                        "Url": "/coins/ltc/",
                        "FollowingType": 1
                    }, {
                        "Id": 7605,
                        "Name": "Ethereum ",
                        "FullName": "Ethereum (ETH)",
                        "ImageUrl": "/media/20646/eth.png",
                        "Url": "/coins/eth/",
                        "FollowingType": 1
                    }, {
                        "Id": 4592,
                        "Name": "ReddCoin",
                        "FullName": "ReddCoin (RDD)",
                        "ImageUrl": "/media/19887/rdd.png",
                        "Url": "/coins/rdd/",
                        "FollowingType": 1
                    }, {
                        "Id": 4430,
                        "Name": "DigiByte",
                        "FullName": "DigiByte (DGB)",
                        "ImageUrl": "/media/19673/dgb.png",
                        "Url": "/coins/dgb/",
                        "FollowingType": 1
                    }],
                    "CryptopianFollowers": [{
                        "Id": 10963,
                        "Name": "endeverinc",
                        "ImageUrl": "/Media/Avatars/10963/472d630c-0868-4cb7-95a3-d17b53571ddb.jpg",
                        "Url": "/profile/endeverinc/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 13274,
                        "Name": "viktdokt",
                        "ImageUrl": "/Media/Avatars/13274/11fac650-cbb2-4d77-87f3-5c6de2f5d4e0.jpg",
                        "Url": "/profile/viktdokt/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 15275,
                        "Name": "epicblake6",
                        "ImageUrl": "/Media/Avatars/15275/691ddc49-f689-42ae-bc1b-ea5d2b146a7c.jpg",
                        "Url": "/profile/epicblake6/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 3831,
                        "Name": "ZeroCool86",
                        "ImageUrl": "/Media/Avatars/3831/03131f55-425f-4d59-9893-a7c90339fba6.png",
                        "Url": "/profile/ZeroCool86/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 13202,
                        "Name": "andreika-53.ru",
                        "ImageUrl": "/Media/Avatars/13202/26658e5f-1721-48d7-a861-0a05a5be0b70.jpg",
                        "Url": "/profile/andreika-53.ru/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 15218,
                        "Name": "097023",
                        "ImageUrl": "/Media/Avatars/15218/7ce5368d-98fa-499f-898e-a0a20acfe375.jpg",
                        "Url": "/profile/097023/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 15256,
                        "Name": "katala323",
                        "ImageUrl": "/Media/Avatars/15256/ad283f8f-72da-41ba-a906-6ac329a05020.jpg",
                        "Url": "/profile/katala323/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 15255,
                        "Name": "darmaed1987",
                        "ImageUrl": "/Media/Avatars/15255/6c5d270b-cc00-46b3-b586-b2029861a0f0.jpg",
                        "Url": "/profile/darmaed1987/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 15215,
                        "Name": "Tgalligan32170",
                        "ImageUrl": "/Media/Avatars/15215/0f27dc46-8f22-4176-9c1e-648a26e6d6eb.jpg",
                        "Url": "/profile/Tgalligan32170/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 8725,
                        "Name": "lomakins62",
                        "ImageUrl": "/Media/Avatars/8725/57a06b1e-9b42-4b09-b307-6c55e422506b.jpg",
                        "Url": "/profile/lomakins62/",
                        "Type": "Cryptopian"
                    }, {
                        "Id": 14179,
                        "Name": "gorbanyov_v",
                        "ImageUrl": "/Media/Avatars/14179/dbc22640-83ec-4039-a766-dc1058053e39.jpg",
                        "Url": "/profile/gorbanyov_v/",
                        "Type": "Cryptopian"
                    }],
                    "Comments": "159",
                    "Points": 8140,
                    "Posts": "74",
                    "Followers": 188,
                    "PageViewsSplit": {
                        "Overview": 32095,
                        "Markets": 2180,
                        "Analysis": 2258,
                        "Charts": 2490,
                        "Trades": 946,
                        "Forum": 1829,
                        "Influence": 1102
                    },
                    "PageViews": 42900
                },
                "Twitter": {
                    "followers": 98788,
                    "following": "98",
                    "lists": 1891,
                    "favourites": "71",
                    "statuses": 12616,
                    "account_creation": "1313643968",
                    "name": "Bitcoin",
                    "link": "https://twitter.com/bitcoin",
                    "Points": 108255
                },
                "Reddit": {
                    "subscribers": 176594,
                    "active_users": 381,
                    "community_creation": "1284042626",
                    "posts_per_hour": "5.06",
                    "posts_per_day": "121.49",
                    "comments_per_hour": "44.82",
                    "comments_per_day": 1075.7,
                    "link": "https://www.reddit.com/r/bitcoin/",
                    "name": "Bitcoin",
                    "Points": 179888
                },
                "Facebook": {
                    "likes": 25816,
                    "is_closed": "false",
                    "talking_about": 93,
                    "name": "Bitcoin P2P Cryptocurrency",
                    "link": "https://www.facebook.com/bitcoins/",
                    "Points": 26746
                },
                "CodeRepository": {
                    "List": [{
                        "stars": 7918,
                        "language": "C++",
                        "forks": 5439,
                        "open_total_issues": "402",
                        "subscribers": 1013,
                        "size": "100332",
                        "url": "https://github.com/bitcoin/bitcoin",
                        "last_update": "1449226680",
                        "last_push": "1449225545",
                        "created_at": "1292771803",
                        "fork": "false",
                        "source": {
                            "Name": "",
                            "Url": "",
                            "InternalId": -1
                        },
                        "parent": {
                            "Name": "",
                            "Url": "",
                            "InternalId": -1
                        },
                        "open_pull_issues": "79",
                        "closed_pull_issues": "4820",
                        "closed_total_issues": "6753",
                        "open_issues": "323",
                        "closed_issues": "1933"
                    }],
                    "Points": 21835
                }
            }
        }

    ];

    const actionFailed = {
        type: FETCH_COIN_META_INFO_FAILED,
        payload: new Error('Network Error'),
        isFetching: false
    };

    const actionRequest = {
        type: FETCH_COIN_META_INFO_REQUEST,
        isFetching: true
    };

    const actionSuccess = {
        type: FETCH_COIN_META_INFO_SUCCESS,
        payload: payload,
        isFetching: false
    };

    it('should fail to fetch coin meta info', () => {
        mock.onGet(url).networkError();
        return store.dispatch(fetchCoinMetaInfo(1182)).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionFailed]);
        });
    });

    it('should successfully fetch coin meta info', () => {
        mock.onGet(url).reply(200, payload);
        return store.dispatch(fetchCoinMetaInfo(1182)).then(() => {
            expect(store.getActions()).toEqual([actionRequest, actionSuccess])
        });
    });

});

