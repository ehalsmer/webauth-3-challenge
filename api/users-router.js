const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');

const router = express.Router();

router.get('/users', (req, res) => {
    Users.getUsers()
    .then(response => {
        res.status(200).json(response)

    })
    .catch(err => {
        res.status(500).json(error)
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
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function generateToken(user){
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, 'server-secret', options)
}

module.exports = router;