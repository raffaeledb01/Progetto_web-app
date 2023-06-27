const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    password: String,
    username: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model('User', userSchema);