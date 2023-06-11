const express = require('express');
const usersControllers = require('../controllers/users');
const router = express.Router();

router.post('/new', usersControllers.addUser)
router.post('/login', usersControllers.loginUser)

module.exports = router;