let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8080/coins/';
} else {
    baseUrl = 'https://api.coin-dash.com/coins/';
}

export default baseUrl;
