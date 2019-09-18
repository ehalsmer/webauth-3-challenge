const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('../data/dbConfig')

const usersRouter = require('./users-router');

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api', usersRouter)

module.exports = server;