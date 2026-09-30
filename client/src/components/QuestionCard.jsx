const QuestionCard = ({
  question,
  index,
  total,
  selectedAnswer,
  onSelectAnswer,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <span className="text-sm font-medium text-accent-600">Question {index + 1} of {total}</span>
        <h3 className="text-lg font-semibold text-navy-800 mt-2">{question.text}</h3>
      </div>
      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.id}
            className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedAnswer === option.id
                ? 'border-accent-500 bg-accent-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => onSelectAnswer(question.id, option.id)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
              selectedAnswer === option.id
                ? 'border-accent-500 bg-accent-500'
                : 'border-gray-300'
            }`}>
              {selectedAnswer === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className={`text-sm ${selectedAnswer === option.id ? 'text-accent-700 font-medium' : 'text-gray-700'}`}>
              {option.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
