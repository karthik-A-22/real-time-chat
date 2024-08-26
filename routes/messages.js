const express = require('express');
const router = express.Router();
const { sendMessage, getMessageHistory } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, sendMessage);
router.get('/history', auth, getMessageHistory);

module.exports = router;
