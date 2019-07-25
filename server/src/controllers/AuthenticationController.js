const User = require('../models/User')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../config/config').SECRET_KEY

module.exports = {
  async register (req, res) {
    try {
      const user = new User(req.body)
      user.password = user.generateHash(user.password) // hash the password
      user.save() // save to database
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwt.sign(userJson, SECRET_KEY, {expiresIn: 3600000})
      }) // send user information and sign the user in
    }
    catch (err) {
      res.status(400).send({
        // error: err.message // only used for finding errors
        error: 'Email already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email:email})
      // check if user has been created
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const checkPassword = await user.validPassword(password)
      if (!checkPassword) {
        return res.status(403).send({
          error: 'Incorrect password'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwt.sign(userJson, SECRET_KEY, {expiresIn: 3600000})
      }) // send user information and sign the user in
    } catch (err) {
        res.status(500).send({
          // error: err.message // only used for finding errors
          error: 'An error has occured trying to log in.'
      })
    }
  }
}
