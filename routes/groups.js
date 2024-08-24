const express = require('express');
const router = express.Router();
const { createGroup } = require('../controllers/groupController');
const auth = require('../middleware/authMiddleware');

router.post('/groups', auth, createGroup);

module.exports = router;
