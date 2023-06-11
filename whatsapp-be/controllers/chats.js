const User = require('../models/chats');
const express = require('express');

module.exports = {

    addChat: (req, res) => {
        Chat.create({
            partecipants: req.body.partecipants,
            messages: req.body.messages,
        })
        .then(r => res.status(201).json(r))
    }
}