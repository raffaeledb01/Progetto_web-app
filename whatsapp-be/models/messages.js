const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    author: String,
    content: String,
    timeStamp: String,
    sent: String
});

module.exports = mongoose.model("Message", messageSchema);