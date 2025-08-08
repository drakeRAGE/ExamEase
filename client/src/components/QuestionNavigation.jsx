const QuestionNavigation = ({
  currentIndex,
  totalQuestions,
  answers,
  onNavigate,
  onSubmit
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`btn ${currentIndex === 0 ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' : 'btn-secondary'}`}
        >
          Previous
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="btn btn-primary"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="btn btn-danger"
          >
            Submit Exam
          </button>
        )}
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-10 h-10 rounded-md text-sm flex items-center justify-center transition-all ${i === currentIndex
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : answers[i] !== null
                    ? 'bg-green-900/40 text-green-300 border border-green-700/50'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;