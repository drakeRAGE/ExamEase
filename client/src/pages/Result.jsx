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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 mb-6">
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
            <h1 className="text-2xl font-bold mb-4">No Result Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find your exam result.</p>
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
    scorePercentage >= 70 ? 'text-green-600' :
    scorePercentage >= 40 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="card mb-6">
          <h1 className="text-2xl font-bold mb-2">Exam Results</h1>
          <p className="text-gray-600 mb-6">
            Completed on {new Date(result.submittedAt).toLocaleString()}
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">Total Questions</p>
                <p className="text-3xl font-bold">{result.totalQuestions}</p>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600">{result.correctCount}</p>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className={`text-3xl font-bold ${scoreColor}`}>{result.score}%</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Question Details</h2>
          
          <div className="space-y-6">
            {result.questions.map((question, index) => (
              <div key={question.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Question {index + 1}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    question.isCorrect 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {question.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <p className="mb-4">{question.questionText}</p>
                
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`p-2 rounded-md ${
                        optIndex === question.correctAnswer
                          ? 'bg-green-100 border border-green-300'
                          : optIndex === question.userAnswer && !question.isCorrect
                          ? 'bg-red-100 border border-red-300'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex-shrink-0 mr-3 ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-500 text-white flex items-center justify-center'
                            : optIndex === question.userAnswer
                            ? 'bg-blue-500 text-white flex items-center justify-center'
                            : 'border border-gray-400'
                        }`}>
                          {(optIndex === question.correctAnswer || optIndex === question.userAnswer) && (
                            <span className="text-xs">✓</span>
                          )}
                        </div>
                        <span>{option}</span>
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