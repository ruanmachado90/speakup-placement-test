import React, { useRef, useEffect } from 'react';
import { MESSAGES } from '../constants/messages';

/**
 * Reusable Question Option Component
 * Supports keyboard navigation and accessibility
 * 
 * @param {Object} props
 * @param {string} props.option - Option text
 * @param {number} props.index - Option index
 * @param {boolean} props.isSelected - Whether this option is selected
 * @param {Function} props.onSelect - Callback when option is selected
 * @param {boolean} props.autoFocus - Whether to auto-focus this option
 */
function QuestionOption({ option, index, isSelected, onSelect, autoFocus = false }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e) => {
    // Allow Enter or Space to select
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(index);
    }
    
    // Arrow navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextButton = buttonRef.current?.parentElement?.nextElementSibling?.querySelector('button');
      nextButton?.focus();
    }
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevButton = buttonRef.current?.parentElement?.previousElementSibling?.querySelector('button');
      prevButton?.focus();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`option-button ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${MESSAGES.accessibility.selectOption} ${index + 1}: ${option}`}
      tabIndex={isSelected || index === 0 ? 0 : -1}
    >
      {option}
    </button>
  );
}

export default QuestionOption;
