const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Please add question text'],
      trim: true,
    },
    options: {
      type: [String],
      required: [true, 'Please add options'],
      validate: {
        validator: function (v) {
          return v.length >= 2; // At least 2 options
        },
        message: 'Please add at least 2 options',
      },
    },
    correctOption: {
      type: Number,
      required: [true, 'Please specify the correct option index'],
      validate: {
        validator: function (v) {
          return v >= 0 && v < this.options.length;
        },
        message: 'Correct option index must be valid',
      },
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    category: {
      type: String,
      default: 'general',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);