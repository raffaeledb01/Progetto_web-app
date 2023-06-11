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
    }
}