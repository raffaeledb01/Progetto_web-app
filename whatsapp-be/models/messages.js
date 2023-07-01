const mongoose = require('mongoose');

// Definizione del modello dei messaggi

const messageSchema = mongoose.Schema({
    author: {   //objectId dell'utente che ha inviato il messaggio
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    timeStamp: String
});

module.exports = mongoose.model("Message", messageSchema);