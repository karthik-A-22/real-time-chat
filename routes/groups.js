const express = require('express');
const router = express.Router();
const { createGroup, getGroups } = require('../controllers/groupController');
const auth = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/list', authMiddleware, getGroups);
router.post('/', auth, createGroup);

module.exports = router;
