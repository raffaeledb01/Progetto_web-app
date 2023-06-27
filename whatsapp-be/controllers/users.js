const User = require('../models/users');

module.exports = {

    addUser: (req, res) => {
        User.create({
            username: req.body.username,
            password: req.body.password,
            friends: req.body.friends
        })
        .then(r => res.status(201).json(r))
    },

    loginUser: (req, res) => {
        User.findOne({
            username: req.body.username,
            password: req.body.password,
        })
        .then( r => {
            if(r)  res.json(r) 
            else res.json({"error": "User not found"})
        })
        .catch(r => res.json({"error": "error"}))
    },

    getAllFriends: (req, res) => {

        User.findOne({_id: req.params.idUser})
        .populate('friends')
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        res.json({ friends: user.friends });
        })
        .catch(err => {
        res.status(500).json({ message: 'Si è verificato un errore durante la ricerca degli amici' });
        });
    },

    addFriend: (req, res) => {
       User.findOne({ _id: req.body.loggedUserId })
          .then(loggedUser => {
            
            if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }
      
            User.findOne({ username: req.body.username })
              .then(user => {
                if (!user) { return res.status(404).json({ message: 'Utente non trovato' }); }
                let isFriendLoggedUser = true;
      
                if (loggedUser.friends.length !== 0) 
                {isFriendLoggedUser = loggedUser.friends.some(friendId =>  friendId.equals(user._id))}
                else if (loggedUser.requests.length === 0 )
                { isFriendLoggedUser = false}
                else { return res.status(400).json({ message: "L'utente è già tuo amico" }); }
                
                let isFriendU = true;
                if (user.requests.length !== 0) { isFriendUser = user.requests.some(requestsId => requestsId.equals(loggedUser._id))}
                else if (user.requests.length === 0) { isFriendUser = false}
                else { return res.status(400).json({ message: 'Richiesta gia inviata' }); }

                
      
                user.requests.push(loggedUser._id);
      
                return Promise.all([user.save()]);
              })
              .then(() => {
                res.json({ message: 'Richiesta mandata con successo' });
              })
              .catch(err => {
                res.status(500).json({ message: 'Si è verificato un errore durante la richiesta di amicizia '});
              });
          })
          .catch(err => {
            res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
          });
      },

      getAllRequests: (req, res) => {
        User.findOne({_id: req.params.idUser})
        .populate('requests')
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        res.json({ requests: user.requests });
        })
        .catch(err => {
        res.status(500).json({ message: 'Si è verificato un errore durante la ricerca delle richiesta di amicizia' });
        });
    },

      acceptRequest: (req, res) => {
        User.findOne({ _id: req.body.loggedUserId })
          .then(loggedUser => {
        
        if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }
  
        User.findOne({ username: req.body.username })
          .then(user => {
            if (!user) { return res.status(404).json({ message: 'Utente non trovato' }); }

            loggedUser.requests = loggedUser.requests.filter(request => !request.equals(user._id));
          
            user.friends.push(loggedUser._id);
            loggedUser.friends.push(user._id)
  
            return Promise.all([user.save(), loggedUser.save()]);
          })
          .then(() => {
            res.json({ message: 'Richiesta mandata con successo' });
          })
          .catch(err => {
            res.status(500).json({ message: 'Si è verificato un errore durante la richiesta di amicizia '});
          });
      })
      .catch(err => {
        res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
      })
    },

    declineRequest: (req, res) => {
      User.findOne({ _id: req.body.loggedUserId })
        .then(loggedUser => {
      
      if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }

      User.findOne({ username: req.body.username })
        .then(user => {
          if (!user) { return res.status(404).json({ message: 'Utente non trovato' }); }

          loggedUser.requests = loggedUser.requests.filter(request => !request.equals(user._id));

          return Promise.all([user.save(), loggedUser.save()]);
        })
        .then(() => {
          res.json({ message: 'Richiesta rifiutato con successo' });
        })
        .catch(err => {
          res.status(500).json({ message: "Si è verificato un errore durante il rifiuto dell'amicizia "});
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
    })
  },

  }
