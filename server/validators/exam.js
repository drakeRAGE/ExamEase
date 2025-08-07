const { check } = require('express-validator');

exports.submitValidator = [
  check('questions', 'Questions array is required').isArray(),
  check('answers', 'Answers array is required').isArray(),
  check('answers.*', 'Each answer must be a number').isNumeric(),
];