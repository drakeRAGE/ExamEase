const express = require('express');
const { getQuestions, submitExam, getResult } = require('../controllers/exam');
const { submitValidator } = require('../validators/exam');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/questions', getQuestions);
router.post('/submit', submitValidator, validateRequest, submitExam);
router.get('/result/:id', getResult);

module.exports = router;