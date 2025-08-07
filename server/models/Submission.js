const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
    ],
    answers: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === this.questions.length;
        },
        message: 'Number of answers must match number of questions',
      },
    },
    correctCount: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', SubmissionSchema);