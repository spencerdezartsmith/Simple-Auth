const User = require('../models/user')

exports.signup = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password!' })
  }
  // search for user with the email
  User.where('email', email).fetch()
    .then(user => {
      if (user) {
        res.status(422).send({ error: 'Email is already in use.' })
      } else {
        new User({ email, password }).save()
          .then(savedUser => res.send(savedUser))
      }
    })
}
