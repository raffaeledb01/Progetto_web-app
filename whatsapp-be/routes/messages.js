const express = require('express')
const messagesController = require('../controllers/messages')
const router = express.Router();

router.post('/new', messagesController.addMessage)

router.get('/getAllMessages', messagesController.getAllMessages)

module.exports = router;