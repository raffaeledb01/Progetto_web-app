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
      .then()
      .then(r => res.json(r))
    }

}