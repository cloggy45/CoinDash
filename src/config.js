let baseUrl = '';

if (process.env.BUILD_ENV === 'development') {
    baseUrl = 'http://localhost:8080/coins/';
} else {
    baseUrl =
        'https://h2wd59kj8k.execute-api.us-east-1.amazonaws.com/production/coins/';
}

export default baseUrl;
