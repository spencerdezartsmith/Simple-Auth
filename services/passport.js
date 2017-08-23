const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const config = require('../config')

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if user.id in payload exists
  // if so call done with the user
  // otherwise call done without a user object
  User.findById(payload.sub)
    .then(user => {
      if (!user) {
        return done(null, false)
      } else {
        return done(null, user)
      }
    })
    .catch(err => done(err, false))
})

// Tell passport to use this strategy
passport.use(jwtLogin)
