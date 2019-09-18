const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');
const secrets = require('../config/secrets');
const restricted = require('./restricted-middleware');

const router = express.Router();

router.get('/users', restricted, (req, res) => {
    Users.findByDept(req.user.department)
    .then(response => {
        // response.push(req.user);
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// todo: create middleware to check for required fields:
// username (unique), password, department
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(response => {
        const regToken = generateToken(response);
        response.token = regToken
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({message: 'error registering user'})
    })
})

router.post('/login', (req, res) => {
    let { username, password} = req.body;
    Users.findBy({ username }).first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({token});
        } else {
            res.status(401).json({message: 'You shall not pass!'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function generateToken(user){
    const payload = {
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;