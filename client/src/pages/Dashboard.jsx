import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useExam } from '../hooks/useExam';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { startExam } = useExam();

  const handleStartExam = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetchQuestions(questionCount);

      if (response.success && response.data.length > 0) {
        startExam(response.data);
        navigate('/exam');
      } else {
        setError('No questions available. Please try again later.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to fetch questions. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="card mb-8">
          <h1 className="text-2xl font-bold mb-2 text-white">
            Welcome, <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">{user?.name}!</span>
          </h1>
          <p className="text-gray-300 mb-6">
            You're ready to take your exam. Once you start, you'll have 30 minutes to complete it.
          </p>

          {error && (
            <div className="mb-4 bg-red-900/30 border-l-4 border-red-500 p-4 text-red-200">
              <p>{error}</p>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="questionCount" className="block text-sm font-medium text-gray-300 mb-1">
              Number of Questions
            </label>
            <select
              id="questionCount"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="input w-full md:w-1/3"
              disabled={loading}
            >
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
              <option value="20">20 Questions</option>
            </select>
          </div>

          <div className="bg-indigo-900/30 p-4 rounded-md mb-6 border border-indigo-800/50">
            <h3 className="font-semibold mb-2 text-indigo-300">Exam Instructions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
              <li>You will have 30 minutes to complete the exam.</li>
              <li>Each question has only one correct answer.</li>
              <li>You can navigate between questions using the navigation buttons.</li>
              <li>Your answers are saved as you go.</li>
              <li>The exam will be automatically submitted when the time expires.</li>
              <li>You cannot pause the exam once started.</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            disabled={loading}
            className="btn btn-primary w-full md:w-auto"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="loader mr-2"></span>
                Loading Questions...
              </span>
            ) : 'Start Exam'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;