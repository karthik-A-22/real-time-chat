const express = require('express');
const router = express.Router();
const { createGroup } = require('../controllers/groupController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createGroup);

module.exports = router;
