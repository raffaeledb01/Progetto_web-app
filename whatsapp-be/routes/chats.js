const express = require('express');
const chatsControllers = require('../controllers/chats');
const router = express.Router();

router.post('/new', chatsControllers.addChat)

module.exports = router;