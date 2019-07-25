var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostSchema = new Schema({
    name: {type: String, maxlength: 100}, // post content
    tag: String, // post tags
    user: String // post user
})

// Export model.
module.exports = mongoose.model('Post', PostSchema)
