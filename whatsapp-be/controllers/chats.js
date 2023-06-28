const User = require('../models/users');
const Chat = require('../models/chats');

module.exports = {

    addChat: (req, res) => {
        User.findOne({ _id: req.body.loggedUserId })
        .then(loggedUser => {
            if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }) }
            User.findOne({ username: req.body.username })
                .then(user => { if (!user) {return res.status(404).json({ message: 'Utente non trovato' });}
                Chat.findOne({partecipants: { $all: [loggedUser._id, user._id] }})
                    .then(existingChat => {
                    if (existingChat) {
                        existingChat.populate('partecipants', 'username ')
                        return existingChat
                    }
                    const newChatData = {
                        partecipants: [loggedUser._id, user._id],
                        messages: []
                    };
                    return Chat.create(newChatData); 
                    })
                    .then(savedChat => { res.json(savedChat) })
                    .catch(error => {res.status(500).json({ message: 'Errore durante la creazione della chat' });});
                    }).catch(error => {res.status(500).json({ message: 'Errore durante la verifica della chat esistente' });})
                }).catch(error => {res.status(500).json({ message: 'Errore durante la ricerca dell\'utente' });})
            },

    getChatsByUsername: (req, res) => {
      User.findOne({username: req.params.username})
      .then( u => Chat.find({ partecipants: { $in: [u._id] } }).populate('partecipants', 'username '))
      .then( r => res.json(r))
    },

}