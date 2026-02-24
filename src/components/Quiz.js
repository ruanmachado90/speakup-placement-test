import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { QUIZ_CONFIG } from '../constants/config';
import { MESSAGES } from '../constants/messages';
import WelcomeScreen from './WelcomeScreen';
import ResultsScreen from './ResultsScreen';
import GrammarSection from './GrammarSection';
import VocabularySection from './VocabularySection';
import ReadingSection from './ReadingSection';
import ProgressBar from './ProgressBar';
import './Quiz.css';

/**
 * Main Quiz Component
 * Manages the entire quiz flow: welcome -> questions -> results
 */
function Quiz() {
  const {
    currentQuestionIndex,
    currentQuestion,
    selectedAnswer,
    showResults,
    userName,
    userPhone,
    userEmail,
    quizStarted,
    totalQuestions,
    error,
    results,
    handleAnswerSelect,
    handleNext,
    handleStartQuiz,
    handleRestart,
    setUserName,
    setUserPhone,
    setUserEmail,
  } = useQuiz();

  // Render welcome screen
  if (!quizStarted) {
    return (
      <WelcomeScreen 
        userName={userName}
        setUserName={setUserName}
        userPhone={userPhone}
        setUserPhone={setUserPhone}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        onStart={handleStartQuiz}
        error={error}
        totalQuestions={totalQuestions}
      />
    );
  }

  // Render results screen
  if (showResults && results) {
    return (
      <ResultsScreen 
        userName={userName} 
        userPhone={userPhone}
        userEmail={userEmail}
        results={results} 
        onRestart={handleRestart} 
      />
    );
  }

  // Render results screen
  if (showResults && results) {
    return (
      <ResultsScreen
        userName={userName}
        results={{ ...results, totalQuestions }}
        onRestart={handleRestart}
      />
    );
  }

  // Render question type component
  const renderQuestionSection = () => {
    const sectionProps = {
      question: currentQuestion,
      selectedAnswer,
      onAnswerSelect: handleAnswerSelect
    };

    switch (currentQuestion.section) {
      case 'grammar':
        return <GrammarSection {...sectionProps} />;
      case 'vocabulary':
        return <VocabularySection {...sectionProps} />;
      case 'reading':
        return <ReadingSection {...sectionProps} />;
      default:
        return null;
    }
  };

  // Render quiz questions
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <img 
          src={QUIZ_CONFIG.LOGOS.blue}
          alt={MESSAGES.accessibility.logoAlt}
          className="header-logo"
        />
        <h1>{MESSAGES.quiz.title}</h1>
        <p className="student-name">
          {MESSAGES.quiz.studentLabel} {userName}
        </p>
      </header>

      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={totalQuestions}
        aria-label={MESSAGES.accessibility.progressBar}
      />

      <main className="quiz-content">
        {renderQuestionSection()}
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
      </main>

      <button 
        onClick={handleNext} 
        className="next-button"
        disabled={selectedAnswer === null}
        aria-disabled={selectedAnswer === null}
      >
        {currentQuestionIndex < totalQuestions - 1 
          ? MESSAGES.quiz.nextButton 
          : MESSAGES.quiz.finishButton
        }
      </button>
    </div>
  );
}

export default Quiz;
