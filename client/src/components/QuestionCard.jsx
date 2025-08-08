const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerSelect }) => {
  if (!question) return null;

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Question {questionNumber}</h3>
        {selectedAnswer !== null && (
          <span className="text-sm bg-green-900/40 text-green-300 px-3 py-1 rounded-full border border-green-700/50">
            Answered
          </span>
        )}
      </div>

      <p className="text-gray-200 mb-6">{question.questionText}</p>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`p-4 border rounded-md cursor-pointer transition-all ${selectedAnswer === index
                ? 'bg-indigo-900/50 border-indigo-500 shadow-md shadow-indigo-900/20'
                : 'border-gray-700/50 hover:bg-indigo-900/20 hover:border-indigo-700/50'
              }`}
          >
            <div className="flex items-start">
              <div className={`w-5 h-5 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${selectedAnswer === index
                  ? 'bg-indigo-600 border-indigo-500'
                  : 'border border-gray-500'
                }`}>
                {selectedAnswer === index && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className="text-gray-200">{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;