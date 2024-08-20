import React, { useState } from 'react';
import PropTypes from 'prop-types';

function QuestionDisplay({ question, onAnswer, onNext }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      onNext();
      setSelectedAnswer(null);
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="mb-4">
        {question.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerChange}
                className="form-radio text-indigo-600"
                aria-label={`Option ${option}`}
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmitAnswer}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-700"
      >
        Next Question
      </button>
    </div>
  );
}

QuestionDisplay.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default QuestionDisplay;
