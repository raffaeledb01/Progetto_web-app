const Message = require('../models/messages');
const express = require('express');
const Chat = require('../models/chats')

module.exports = {

    addMessage: (req, res) => {
        Message.create({
            author: req.body.author,
            content: req.body.content,
            timeStamp: req.body.timeStamp,
        })
        .then(r => res.status(201).json(r))
    },

    getAllMessagesbyChat: (req, res) => {
       Chat.findOne({_id: req.params.idChat})
       .then(chat => Message.find().populate('author'))
       .then(r => res.json(r)) 
    }



}