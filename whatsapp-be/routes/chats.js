const express = require('express');
const chatsControllers = require('../controllers/chats');
const router = express.Router();

router.post('/new', chatsControllers.addChat)
router.get('/all', chatsControllers.getChatsByLoggedUser)

module.exports = router;