const express = require('express');
const Users = require('./users-model');

const router = express.Router();

router.get('/users', (req, res)=>{
    Users.getUsers()
    .then(response => {
        res.status(200).json(response)

    })
    .catch(err => {
        res.status(500).json(error)
    })
})


module.exports = router;