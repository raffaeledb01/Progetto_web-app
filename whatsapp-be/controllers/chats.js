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

    getChatsByEmailANDPassword: (req, res) => {
        User.findOne({email: req.params.email, password: req.params.password})
        .populate('chats')
        .then(user => user.chats)
        .then(r => res.json(r))
    }

}