import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExamResult } from '../services/api';
import { useExam } from '../hooks/useExam';

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { submissionId, resetExam } = useExam();

  useEffect(() => {
    const fetchResult = async () => {
      if (!submissionId) {
        navigate('/dashboard');
        return;
      }

      try {
        setLoading(true);
        const response = await getExamResult(submissionId);

        if (response.success) {
          setResult(response.data);
        } else {
          setError('Failed to fetch result. Please try again.');
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to fetch result. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [submissionId, navigate]);

  const handleBackToDashboard = () => {
    resetExam();
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-900/30 border-l-4 border-red-500 p-4 text-red-200 mb-6">
            <p>{error}</p>
          </div>
          <button
            onClick={handleBackToDashboard}
            className="btn btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <h1 className="text-2xl font-bold mb-4 text-white">No Result Found</h1>
            <p className="text-gray-300 mb-6">We couldn't find your exam result.</p>
            <button
              onClick={handleBackToDashboard}
              className="btn btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate score percentage
  const scorePercentage = result.score;
  const scoreColor =
    scorePercentage >= 70 ? 'text-green-400' :
      scorePercentage >= 40 ? 'text-yellow-400' :
        'text-red-400';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl lg:max-w-5xl mx-auto">
        <div className="card mb-6">
          <h1 className="text-2xl font-bold mb-2 text-white">Exam Results</h1>
          <p className="text-gray-400 mb-6">
            Completed on {new Date(result.submittedAt).toLocaleString()}
          </p>

          <div className="bg-indigo-900/30 p-6 rounded-lg mb-6 border border-indigo-800/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">Total Questions</p>
                <p className="text-3xl font-bold text-white">{result.totalQuestions}</p>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">Correct Answers</p>
                <p className="text-3xl font-bold text-green-400">{result.correctCount}</p>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">Score</p>
                <p className={`text-3xl font-bold ${scoreColor}`}>{result.score}%</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-white">Question Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.questions.map((question, index) => (
              <div key={question.id} className="border border-gray-700/50 rounded-md p-4 bg-gray-900/30">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Question {index + 1}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${question.isCorrect
                      ? 'bg-green-900/40 text-green-300 border border-green-700/50'
                      : 'bg-red-900/40 text-red-300 border border-red-700/50'
                    }`}>
                    {question.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <p className="mb-4 text-gray-300">{question.questionText}</p>

                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-md ${optIndex === question.correctAnswer
                          ? 'bg-green-900/30 border border-green-700/50'
                          : optIndex === question.userAnswer && !question.isCorrect
                            ? 'bg-red-900/30 border border-red-700/50'
                            : 'bg-gray-800/50 border border-gray-700/50'
                        }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${optIndex === question.correctAnswer
                            ? 'bg-green-600 text-white'
                            : optIndex === question.userAnswer
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-500'
                          }`}>
                          {(optIndex === question.correctAnswer || optIndex === question.userAnswer) && (
                            <span className="text-xs">✓</span>
                          )}
                        </div>
                        <span className="text-gray-300">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleBackToDashboard}
              className="btn btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;