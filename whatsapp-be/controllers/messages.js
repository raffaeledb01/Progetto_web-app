const Message = require('../models/messages');
const express = require('express');

module.exports = {

    addMessage: (req, res) => {
        Message.create({
            author: req.body.author,
            content: req.body.content,
            timeStamp: req.body.timeStamp,
            sent: req.body.sent
        })
        .then(r => res.status(201).json(r))
    },

    getAllMessages: (req, res) => {
        Message.find({author: 'simone'}).populate('')
        .then(r => res.json(r))    
    }

}