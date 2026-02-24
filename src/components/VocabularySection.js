import React from 'react';
import { MESSAGES } from '../constants/messages';

/**
 * Vocabulary Section Component
 * Renders vocabulary questions with multiple choice options
 */
function VocabularySection({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <section className="question-section" aria-labelledby="section-title">
      <h2 id="section-title" className="section-title">
        {MESSAGES.sections.vocabulary}
      </h2>
      <div className="question-level" aria-label={MESSAGES.sections.level(question.level)}>
        {MESSAGES.sections.level(question.level)}
      </div>
      <p className="question-text" id="question-text">
        {question.question}
      </p>
      <div 
        className="options-container" 
        role="radiogroup" 
        aria-labelledby="question-text"
      >
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedAnswer === index ? 'selected' : ''
            }`}
            onClick={() => onAnswerSelect(index)}
            role="radio"
            aria-checked={selectedAnswer === index}
            aria-label={`${MESSAGES.accessibility.selectOption} ${index + 1}: ${option}`}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}

export default VocabularySection;