import React from 'react';
import { MESSAGES } from '../constants/messages';

/**
 * Progress Bar Component
 * Shows the current progress through the quiz
 */
function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container" role="region" aria-label={MESSAGES.accessibility.progressBar}>
      <div 
        className="progress-bar" 
        role="progressbar" 
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${percentage.toFixed(0)}% complete`}
      >
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-text" aria-live="polite">
        {MESSAGES.quiz.progressText(current, total)}
      </div>
    </div>
  );
}

export default ProgressBar;
