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
  },
  comparePasswords: function(password, callback) {
    const comparePromise = Promise.promisify(bcrypt.compare)
    return comparePromise(password, this.get('password'))
      .then(isMatch => callback(null, isMatch))
      .catch(err => callback(err))
  }
}, {
  findByEmail: function(email) {
    return this.query({ where: { email }}).fetch()
  },
  findById: function(id) {
    return this.query({ where: { id }}).fetch()
  }
})

module.exports = User
