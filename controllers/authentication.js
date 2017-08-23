const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
  // always use a unique identifyer
  // sub prop is convention. it stands for subject ie. who is the token about
  // iat: issued at time
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password!' })
  }
  // search for user with the email
  User.byEmail(email)
    .then(user => {
      if (user) {
        res.status(422).send({ error: 'Email is already in use.' })
      } else {
        new User({ email, password }).save()
          .then(savedUser => res.send({ token: tokenForUser(savedUser) }))
      }
    })
}
