'use strict'
const Post = require('../models/Post')

module.exports = {
  async index (req, res) {
    try {
      const posts = await Post.find({}) // find every post
      res.send(posts)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the posts'
      })
    }
  },
  async create (req, res) {
    try {
      const post = await new Post(req.body) // create a new post by reading body content
      post.save() // save to database
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a post'
      })
    }
  },
  async delete (req, res, next) {
    await Post.findByIdAndRemove({_id: req.params.id}, (err,posts) => {
      if(err) res.json(err)
      else res.json('Post succesfully removed')
    }) // find the user by id and remove it
  },
  async searchPostByUser (req, res) {
    try {
      const posts = await Post.find(req.query) // find any matching users
      if (posts.length === 0) { // if none were found then send error message
        res.status(404).send({
          error: 'No posts were found.'
        })
      }
      res.send(posts) // send found users posts
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the posts'
      })
    }
  },
  async searchPostByTag (req, res) {
    try {
      const posts = await Post.find(req.query) // find any matching tags
      res.send(posts) // send found posts by tag
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the posts'
      })
    }
  },
}
