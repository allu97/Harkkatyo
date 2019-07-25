const AuthenticationController = require('./controllers/AuthenticationController')
// middleware to check for registration details
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
// middleware to check for post details
const PostsControllerPolicy = require('./policies/PostsControllerPolicy')
const PostsController = require('./controllers/PostsController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationControllerPolicy.duplicates,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/posts',
    PostsController.index)

  app.post('/posts',
    PostsControllerPolicy.create,
    PostsController.create)

  app.get('/posts/:id',
    PostsController.delete)

  app.get('/posts:user',
    PostsController.searchPostByUser)

  app.get('/posts:tag',
    PostsController.searchPostByTag)
}
