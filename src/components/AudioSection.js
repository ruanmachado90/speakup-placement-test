import React from 'react';
import { MESSAGES } from '../constants/messages';
import AudioPlayer from './AudioPlayer';

/**
 * Listening Section Component with Audio Player
 */
function AudioSection({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <section className="question-section" aria-labelledby="section-title">
      <h2 id="section-title" className="section-title">
        {MESSAGES.sections.listening || 'Listening'}
      </h2>
      
      <div className="question-level" aria-label={MESSAGES.sections.level(question.level)}>
        {MESSAGES.sections.level(question.level)}
      </div>

      {/* Audio Player */}
      <AudioPlayer 
        audioUrl={question.audioUrl} 
        segment={question.audioSegment}
      />

      {/* Listening Instructions */}
      <div className="listening-instructions">
        <p>🎧 Listen carefully and answer the question below.</p>
        <p className="instruction-note">You can replay the audio as needed.</p>
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

export default AudioSection;