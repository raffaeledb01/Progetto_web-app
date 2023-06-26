const User = require('../models/users');
const Chat = require('../models/chats');

module.exports = {

    addChat: (req, res) => {
        Chat.create({
            partecipants: req.body.partecipants,
            messages: req.body.messages,
        })
        .then(r => res.status(201).json(r))
    },

    getChatsByUsername: (req, res) => {
      User.findOne({username: req.params.username})
      .then( u => Chat.find({ partecipants: { $in: [u._id] } }).populate('partecipants', 'username firstName lastName'))
      .then( r => res.json(r))
    },

}