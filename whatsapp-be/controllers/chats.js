const User = require('../models/users');
const Chat = require('../models/chats');

module.exports = {

    addChat: (req, res) => {
        

            User.findOne({ _id: req.body.loggedUserId })
            .then(loggedUser => {
                if (!loggedUser) {
                    return res.status(404).json({ message: 'Utente non trovato' });
                }

                User.findOne({ username: req.body.username })
                    .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: 'Utente non trovato' });
                    }

                    Chat.findOne({
                        partecipants: { $all: [loggedUser._id, user._id] }
                    })
                    //Se la chat esiste dovremmo runnare il controllore getChatbyUsername
                        .then(existingChat => {
                        if (existingChat) {
                            return res.status(400).json({ message: 'Chat già esistente' });
                        }

                        Chat.create({
                            partecipants: [loggedUser._id, user._id],
                            messages: []
                        });

                        newChat.save()
                            .then(savedChat => {
                            res.json({ message: 'Chat creata con successo', chat: savedChat });
                            })
                            .catch(error => {
                            res.status(500).json({ message: 'Errore durante la creazione della chat' });
                            });
                        })
                        .catch(error => {
                        res.status(500).json({ message: 'Errore durante la verifica della chat esistente' });
                        });
                    })
                    .catch(error => {
                    res.status(500).json({ message: 'Errore durante la ricerca dell\'utente' });
                    });
                })
                .catch(error => {
                res.status(500).json({ message: 'Errore durante la ricerca dell\'utente' });
                });
    },

    getChatsByUsername: (req, res) => {
      User.findOne({username: req.params.username})
      .then( u => Chat.find({ partecipants: { $in: [u._id] } }).populate('partecipants', 'username firstName lastName'))
      .then( r => res.json(r))
    },

}