import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitExam } from '../services/api';
import { useExam } from '../hooks/useExam';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import QuestionNavigation from '../components/QuestionNavigation';

const Exam = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { 
    questions, 
    currentQuestionIndex, 
    answers, 
    examEndTime,
    answerQuestion, 
    nextQuestion, 
    previousQuestion,
    setSubmissionId,
  } = useExam();

  useEffect(() => {
    // Redirect if no questions are loaded
    if (!questions || questions.length === 0) {
      alert("No questions is there to get!")
      navigate('/dashboard');
    }
    
    // Warn user before leaving the page
    const handleBeforeUnload = (e) => {
      const message = 'Are you sure you want to leave? Your exam progress will be lost.';
      e.returnValue = message;
      return message;
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [questions, navigate]);

  const handleAnswerSelect = (answerIndex) => {
    answerQuestion(currentQuestionIndex, answerIndex);
  };

  const handleNavigate = (index) => {
    if (index < 0 || index >= questions.length) return;
    
    if (index > currentQuestionIndex) {
      nextQuestion();
    } else if (index < currentQuestionIndex) {
      previousQuestion();
    }
  };

  const handleSubmit = async () => {
    const unansweredCount = answers.filter(a => a == null).length; // match null or undefined

    const confirmed = window.confirm(
      unansweredCount > 0
        ? `You have ${unansweredCount} unanswered question${unansweredCount > 1 ? 's' : ''}. Are you sure you want to submit?`
        : 'Are you sure you want to submit your exam?'
    );

    if (!confirmed) return;

    try {
      await submitExamAnswers();
    } catch (err) {
      console.error("Submission failed in handleSubmit:", err);
    }
  };


  const handleTimeExpired = async () => {
    alert('Time is up! Your exam will be submitted automatically.');
    await submitExamAnswers();
  };

  const submitExamAnswers = async () => {
    try {
      setSubmitting(true);
      setError('');
      
      const questionIds = questions.map(q => q._id);
      
      const response = await submitExam({
        questions: questionIds,
        answers: answers,
      });
      
      if (response.success) {
        setSubmissionId(response.data.id);
        navigate('/result');
      } else {
        setError('Failed to submit exam. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to submit exam. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div className="w-full md:w-auto order-2 md:order-1">
            <h1 className="text-2xl font-bold">Exam in Progress</h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <div className="w-full md:w-auto order-1 md:order-2">
            <Timer endTime={examEndTime} onTimeExpired={handleTimeExpired} />
          </div>
        </div>
        
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
        />
        
        <QuestionNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          answers={answers}
          onNavigate={handleNavigate}
          onSubmit={handleSubmit}
        />
        
        {submitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg font-semibold">Submitting your exam...</p>
              <p className="text-sm text-gray-600">Please don't close this page.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;