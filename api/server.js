const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('../data/dbConfig')


const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
    db('users')
    .then(response => {
        res.status(200).json(response)

    })
    .catch(err => {
        res.status(500).json(error)
    })
})

module.exports = server;