const bcrypt = require('bcrypt-nodejs')
const Promise = require('bluebird')
const bookshelf = require('../db/bookshelf')

const User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('creating', this.hashPassword)
  },
  hashPassword: function() {
    const model = this
    const hashPromise = Promise.promisify(bcrypt.hash)
    return hashPromise(model.get('password'), null, null)
      .then(hash => {
        model.set('password', hash)
      })
  }
})

module.exports = User
