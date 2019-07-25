'use strict'
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('posts')
  },
  post (post) {
    return Api().post('posts', post)
  },
  deletePost (id) {
    return Api().get(`posts/${id}`)
  },
  searchPostByUser (user) {
    return Api().get('posts:user', {
      params: {
        user: user
      }
    })
  },
  searchPostByTag (tag) {
    return Api().get('posts:tag', {
      params: {
        tag: tag
      }
    })
  }
}
