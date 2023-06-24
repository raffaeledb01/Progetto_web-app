const User = require('../models/chats');
const express = require('express');

module.exports = {

    addChat: (req, res) => {
        Chat.create({
            partecipants: req.body.partecipants,
            messages: req.body.messages,
        })
        .then(r => res.status(201).json(r))
    },

    getChatsByLoggedUser: (req, res) => {
        User.findOne({_id: req.params.loggedUser._id})
        .then( u => Chat.find({ participants: { $in: [u._id] } }).populate('participants', 'username firstName lastName'))
        .then( r => res.json(r))
    },
}