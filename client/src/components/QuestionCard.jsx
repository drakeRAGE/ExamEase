const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerSelect }) => {
  if (!question) return null;

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Question {questionNumber}</h3>
        {selectedAnswer !== null && (
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            Answered
          </span>
        )}
      </div>
      
      <p className="text-gray-800 mb-6">{question.questionText}</p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div 
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedAnswer === index 
                ? 'bg-blue-100 border-blue-500' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start">
              <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 ${
                selectedAnswer === index 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-gray-400'
              }`}>
                {selectedAnswer === index && (
                  <span className="flex items-center justify-center text-white text-xs">✓</span>
                )}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;