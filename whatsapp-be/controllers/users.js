const User = require('../models/users');

module.exports = {

    addUser: (req, res) => {
        User.create({
            username: req.body.username,
            password: req.body.password,
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
    }
}