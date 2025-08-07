const Question = require('../models/Question');
const Submission = require('../models/Submission');

// Get random questions => GET /api/exam/questions           => Private
exports.getQuestions = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 10; // Default to 10 questions
    
    // Get random questions
    const questions = await Question.aggregate([
      { $sample: { size: count } },
      { $project: { correctOption: 0 } } // Not sending correct answer to client
    ]);

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

// Submit exam answers => POST /api/exam/submit               => Private
exports.submitExam = async (req, res, next) => {
  try {
    const { questions, answers } = req.body;
    
    if (questions.length !== answers.length) {
      return res.status(400).json({
        success: false,
        message: 'Number of answers must match number of questions',
      });
    }

    // Getting all questions to check correct answers
    const questionDocs = await Question.find({ _id: { $in: questions } });
    
    // Mapping questions by ID for easy lookup
    const questionsMap = {};
    questionDocs.forEach(q => {
      questionsMap[q._id.toString()] = q;
    });

    // Calculating score
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questionsMap[questions[i]];
      if (question && question.correctOption === answers[i]) {
        correctCount++;
      }
    }

    const score = (correctCount / questions.length) * 100;

    // Creating submission record
    const submission = await Submission.create({
      userId: req.user.id,
      questions,
      answers,
      correctCount,
      score,
    });

    res.status(201).json({
      success: true,
      data: {
        id: submission._id,
        correctCount,
        totalQuestions: questions.length,
        score,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get submission result => GET /api/exam/result/:id               => Private
exports.getResult = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('questions')
      .populate('userId', 'name email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Checking if the submission belongs to the logged-in user
    if (submission.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this submission',
      });
    }

    // Formatting the result with detailed information
    const detailedResult = {
      id: submission._id,
      user: submission.userId,
      submittedAt: submission.submittedAt,
      correctCount: submission.correctCount,
      totalQuestions: submission.questions.length,
      score: submission.score,
      questions: submission.questions.map((q, index) => ({
        id: q._id,
        questionText: q.questionText,
        options: q.options,
        userAnswer: submission.answers[index],
        correctAnswer: q.correctOption,
        isCorrect: submission.answers[index] === q.correctOption,
      })),
    };

    res.status(200).json({
      success: true,
      data: detailedResult,
    });
  } catch (error) {
    next(error);
  }
};