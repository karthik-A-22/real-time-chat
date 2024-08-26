const express = require('express');
const router = express.Router();
const { createGroup, getGroups, sendGroupMessage } = require('../controllers/groupController');
const auth = require('../middleware/authMiddleware');

router.get('/list', auth, getGroups);
router.post('/', auth, createGroup);
router.post('/:groupId/messages', auth, sendGroupMessage);

module.exports = router;
