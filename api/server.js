// implement your server here
const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(postsRouter);
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
})
// require your posts router and connect it here

module.exports = server;