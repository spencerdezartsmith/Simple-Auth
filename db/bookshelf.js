// Initialize an instance of bookshelf
const environment = process.env.NODE_ENV
const config = require('../knexfile')
const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
