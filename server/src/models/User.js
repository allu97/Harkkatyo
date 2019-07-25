var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, unique: true },
    password: {type: String},
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Export model.
module.exports = mongoose.model('User', UserSchema);
