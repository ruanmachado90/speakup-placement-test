import { useState, useCallback, useMemo } from 'react';
import { grammarQuestions } from '../data/grammarQuestions';
import { vocabularyQuestions } from '../data/vocabularyQuestions';
import { readingQuestions } from '../data/readingQuestions';
import { calculateLevel, getLevelBreakdown, validateUserName } from '../utils/quizHelpers';
import { MESSAGES } from '../constants/messages';

/**
 * Custom hook to manage quiz state and logic
 * Supports 3 sections: Grammar, Vocabulary, Reading (60 questions total)
 */
export const useQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [error, setError] = useState(null);

  // Combine all questions with section info
  const allQuestions = useMemo(() => {
    const addSection = (questions, section) => 
      questions.map(q => ({ ...q, section: q.section || section }));
    
    return [
      ...addSection(grammarQuestions, 'grammar'),
      ...addSection(vocabularyQuestions, 'vocabulary'),
      ...addSection(readingQuestions, 'reading')
    ];
  }, []);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  // Handle answer selection
  const handleAnswerSelect = useCallback((answerIndex) => {
    setSelectedAnswer(answerIndex);
    setError(null);
  }, []);

  // Handle moving to next question
  const handleNext = useCallback(() => {
    if (selectedAnswer === null) {
      setError(MESSAGES.quiz.emptyAnswerError);
      return;
    }

    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        section: currentQuestion.section,
        type: currentQuestion.type || currentQuestion.section,
        level: currentQuestion.level,
        selectedAnswer,
        correct: selectedAnswer === currentQuestion.correct
      }
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setError(null);
    } else {
      setShowResults(true);
    }
  }, [selectedAnswer, answers, currentQuestion, currentQuestionIndex, totalQuestions]);

  // Handle quiz start
  const handleStartQuiz = useCallback((e) => {
    e.preventDefault();
    const validation = validateUserName(userName);
    
    if (!validation.isValid) {
      setError(MESSAGES.welcome.emptyNameError);
      return;
    }
    
    if (!userPhone.trim()) {
      setError('Por favor, insira seu telefone');
      return;
    }
    
    if (!userEmail.trim()) {
      setError('Por favor, insira seu email');
      return;
    }
    
    setUserName(validation.value);
    setQuizStarted(true);
    setError(null);
  }, [userName, userPhone, userEmail]);

  // Handle quiz restart
  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
    setUserName('');
    setUserPhone('');
    setUserEmail('');
    setError(null);
  }, []);

  // Calculate results with section breakdown
  const results = useMemo(() => {
    if (!showResults) return null;
    
    const correctAnswers = answers.filter(a => a.correct).length;
    const level = calculateLevel(correctAnswers, totalQuestions);
    const breakdown = getLevelBreakdown(answers);
    
    // Section breakdown
    const sectionBreakdown = {};
    ['grammar', 'vocabulary', 'reading'].forEach(section => {
      const sectionAnswers = answers.filter(a => a.section === section);
      const sectionCorrect = sectionAnswers.filter(a => a.correct).length;
      sectionBreakdown[section] = {
        correct: sectionCorrect,
        total: sectionAnswers.length,
        percentage: sectionAnswers.length > 0 
          ? ((sectionCorrect / sectionAnswers.length) * 100).toFixed(1)
          : 0
      };
    });
    
    return {
      correctAnswers,
      level,
      breakdown,
      sectionBreakdown,
      percentage: ((correctAnswers / totalQuestions) * 100).toFixed(1)
    };
  }, [showResults, answers, totalQuestions]);

  return {
    // State
    currentQuestionIndex,
    currentQuestion,
    selectedAnswer,
    answers,
    showResults,
    userName,
    userPhone,
    userEmail,
    quizStarted,
    totalQuestions,
    error,
    results,
    
    // Actions
    handleAnswerSelect,
    handleNext,
    handleStartQuiz,
    handleRestart,
    setUserName,
    setUserPhone,
    setUserEmail,
    setError
  };
};
