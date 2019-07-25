const Joi = require('joi')
const User = require('../models/User')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema)
    // provides information on errors
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'You must provide a valid password'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next() // if there was no errors, then move forward
    }
  },
  duplicates (req, res, next) {
    const {email, password} = req.body
    // find duplicate users from User database
    User.findOne({email:email}, function (err, user) {
      if (err)
        return done(err);
      // check to see if theres already a user with that email
      if (user) {
        res.status(400).send({
          error: 'Username already taken.'
        })
      } else {
        next()
      }
    })
  }
}
