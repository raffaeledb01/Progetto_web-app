const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }]
});

mongoose.exports = mongoose.model('User', userSchema);