const User = require('../models/users');

module.exports = {

  addUser: (req, res) => {
    User.findOne({
      username: req.body.username,
    })
      .then(existingUser => {
        if (existingUser) {
          res.json({ "error": "Utente già esistente" });
        } else {
          User.create({
            username: req.body.username,
            password: req.body.password
          })
            .then(newUser => res.json(newUser))
            .catch(error => {
              res.json({ "error": "Errore durante la creazione dell'utente" });
            });
        }
      })
      .catch(error => {
        res.json({ "error": "Errore durante la ricerca dell'utente" });
      });
  },

    loginUser: (req, res) => {
      User.findOne({
        username: req.body.username,
      })
        .then(user => {
          if (user) {
            if (req.body.password === user.password) {
              res.json(user);
            } else {
              res.json({ "error": "Password errata" });
            }
          } else {
            res.json({ "error": "Utente non trovato" });
          }
        })
        .catch(error => {
          res.json({ "error": "Errore durante la ricerca dell'utente" });
        });
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
                {isFriendLoggedUser = loggedUser.friends.some(friendId => friendId.equals(user._id))}
                else if (loggedUser.requests.length === 0 )
                { isFriendLoggedUser = false}

                if(isFriendLoggedUser) { return res.status(400).json({ message: "L'utente è già tuo amico" }); }
                
                let isFriendUser = true;
                if (user.requests.length !== 0) { isFriendUser = user.requests.some(requestsId => requestsId.equals(loggedUser._id))}
                else if (user.requests.length === 0) { isFriendUser = false}
                
                if (isFriendUser) { return res.status(400).json({ message: 'Richiesta gia inviata' }); }

                
      
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

  removeFriend: (req, res) => {
    User.findOne({ _id: req.body.loggedUserId })
      .then(loggedUser => {
    
    if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }

    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) { return res.status(404).json({ message: 'Utente non trovato' }); }

        loggedUser.friends = loggedUser.friends.filter(friends => !friends.equals(user._id));
        user.friends = user.friends.filter(friends => !friends.equals(loggedUser._id));


        return Promise.all([user.save(), loggedUser.save()]);
      })
      .then(() => {
        res.json({ message: 'Amico rimosso con successo' });
      })
      .catch(err => {
        res.status(500).json({ message: "Si è verificato un errore durante la rimozione dell'amicizia "});
      });
  })
  .catch(err => {
    res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
  })
},


  }
