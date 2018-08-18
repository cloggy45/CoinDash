const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();
const dev = process.env.NODE_ENV === 'development';

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: dev,
}));

app.use('/', (req, res) => {
    res.json('Go to /graphql to test your queries and mutations!');
});

const server = app.listen(3000, () => {
    const { port } = server.address();
    console.info(`\n\nExpress listen at http://localhost:${port} \n`);
});