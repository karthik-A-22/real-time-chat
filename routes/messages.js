const express = require('express');
const router = express.Router();
const { sendMessage, getMessageHistory } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.post('/messages', auth, sendMessage);
router.get('/messages/history', auth, getMessageHistory);

module.exports = router;
