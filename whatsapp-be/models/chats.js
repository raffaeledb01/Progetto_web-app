const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    partecipants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

mongoose.exports = mongoose.model('Chat', chatSchema);