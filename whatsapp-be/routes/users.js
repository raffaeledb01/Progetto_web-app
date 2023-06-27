const express = require('express');
const usersControllers = require('../controllers/users');
const router = express.Router();

router.post('/new', usersControllers.addUser)
router.post('/login', usersControllers.loginUser)
router.get('/getFriends/:idUser', usersControllers.getAllFriends)
router.post('/addFriend', usersControllers.addFriend)

module.exports = router;