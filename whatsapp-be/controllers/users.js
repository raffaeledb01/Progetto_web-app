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
                console.log(loggedUser.friends.length)
                if (!user) { return res.status(404).json({ message: 'Amico non trovato' }); }
                let isFriendLoggedUser = true;
      
                if (loggedUser.friends.length !== 0) 
                {isFriendLoggedUser = loggedUser.friends.some(friendId =>  friendId.equals(user._id))}
                else if (loggedUser.friends.length === 0 )
                { isFriendLoggedUser = false}
                else { return res.status(400).json({ message: 'Questo utente è già un amico' }); }
                
                let isFriendUser = true;
                if (user.friends.length !== 0) { isFriendUser = user.friends.some(friendId => friendId.equals(loggedUser._id))}
                else if (user.friends.length === 0) { isFriendUser = false}
                else { return res.status(400).json({ message: 'Questo utente è già un amico' }); }

                
      
                loggedUser.friends.push(user._id);
                user.friends.push(loggedUser._id);
      
                return Promise.all([loggedUser.save(), user.save()]);
              })
              .then(() => {
                res.json({ message: 'Amico aggiunto con successo' });
              })
              .catch(err => {
                res.status(500).json({ message: 'Si è verificato un errore durante l\'aggiunta dell\'amico' });
              });
          })
          .catch(err => {
            res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
          });
      }
    }
