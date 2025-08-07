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
          className={`btn ${currentIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'btn-secondary'}`}
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
        <p className="text-sm text-gray-600 mb-2">Question Navigator</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-8 h-8 rounded-full text-sm flex items-center justify-center ${
                i === currentIndex
                  ? 'bg-blue-600 text-white'
                  : answers[i] !== null
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-800'
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