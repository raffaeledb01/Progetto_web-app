const User = require('../models/users');
const express = require('express');

module.exports = {

    addUser: (req, res) => {
        User.create({
            email: req.body.email,
            password: req.body.password,
            chat: req.body.chat
        })
        .then(r => res.status(201).json(r))
    },

    loginUser: (req, res) => {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        .then( r => {
            if(r) res.json(r) 
            else res.json({"error": "User not found"})
        })
        .catch( r => { res.json({ "error": "error"})})
    }
}