const express = require('express');
const usersControllers = require('../controllers/users');
const router = express.Router();

router.post('/new', usersControllers.addUser)

module.exports = router;