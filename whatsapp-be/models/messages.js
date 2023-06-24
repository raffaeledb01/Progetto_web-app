const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    timeStamp: String
});

module.exports = mongoose.model("Message", messageSchema);