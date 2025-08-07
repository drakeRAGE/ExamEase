const express = require('express');
const { register, login, getMe } = require('../controllers/auth');
const { registerValidator, loginValidator } = require('../validators/auth');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.get('/me', protect, getMe);

module.exports = router;