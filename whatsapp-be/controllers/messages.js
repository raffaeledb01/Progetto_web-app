const Message = require('../models/messages');
const express = require('express');
const Chat = require('../models/chats');
const messages = require('../models/messages');
const User = require('../models/users');

module.exports = {

    addMessage: (req, res) => {
        Message.create({
            author: req.body.author,
            content: req.body.content,
            timeStamp: req.body.timeStamp,
        })
        .then(message => {
            const chatId = req.body.chatId;
            return Chat.findOneAndUpdate(
                {_id: chatId},
                { $push: { messages: message._id}},
                { new: true}
            ).populate('messages')
        }).then(updatedChat => {
            if(updatedChat) {
                res.json(updatedChat.messages)
            }else {
                throw new Error('Chat not found');  
            }
        }).catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          });
            
    },
      

    getAllMessagesbyChat: (req, res) => {
       Chat.findOne({_id: req.params.idChat}).populate({
        path: 'messages',
        populate: {
          path: 'author',
          select: 'username' 
        }
      })
       .then(chat => res.json(chat.messages)) 
    }
}