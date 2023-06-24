const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    password: String,
    username: String
});

module.exports = mongoose.model('User', userSchema);