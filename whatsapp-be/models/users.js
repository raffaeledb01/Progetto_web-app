const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    password: String,
    username: String
});

mongoose.exports = mongoose.model('User', userSchema);