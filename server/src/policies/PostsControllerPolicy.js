const Joi = require('joi')
const Post = require('../models/Post')

// PostsControllerPolicy is a middleware to validate the inputs
module.exports = {
  create (req, res, next) {
    if (!req.body.tag) {
      // if tag was empty, then only validate post
      const schema = {
        name: Joi.string().min(1).max(100)
      }
      const {error} = Joi.validate({ name: req.body.name }, schema)
      if (error) {
        switch (error.details[0].context.key) {
          case 'name':
            res.status(400).send({
              error: 'Post must be of length 1-100 characters.'
            })
            break
          default:
            res.status(400).send({
              error: 'Invalid post information.'
              // error: error.message
            })
        }
      } else {
        next()
      }
    }
    else {
      // if post included a tag, then also validate the tag
      const schema = {
        name: Joi.string().min(1).max(100),
        tag: Joi.string().min(1).max(15).regex(/(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/),
      }
      const {error} = Joi.validate({ name: req.body.name, tag: req.body.tag }, schema)
      // provides information on errors
      if (error) {
        switch (error.details[0].context.key) {
          case 'name':
            res.status(400).send({
              error: 'Post must be of length 1-100 characters.'
            })
            break
          case 'tag':
            res.status(400).send({
              error: 'Tag must be of length 1-20 characters and can\'t contain any special characters. '
            })
            break
          default:
            res.status(400).send({
              error: error.message
            })
        }
      } else {
        next() // if there was no errors, then move forward
      }
    }
  }
}
