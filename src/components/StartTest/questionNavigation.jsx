import React from 'react';
import PropTypes from 'prop-types';

function QuestionNavigation({ questions, currentQuestion, onNavigate }) {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">Question Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`p-2 rounded-full ${
              currentQuestion === index ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            } hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label={`Go to question ${index + 1}`}
            aria-current={currentQuestion === index ? 'true' : 'false'}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

QuestionNavigation.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default QuestionNavigation;
