const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    findBy,
    add,
    findById
}

function getUsers(){
    return db('users')
}

function findBy(filter){
    return db('users').where(filter);
}

async function add(user){
    const [id] = await db('users').insert(user);
    return findById(id);
}

function findById(id){
    return db('users').where({ id }).first();
}