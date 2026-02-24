import React, { useState, useEffect } from 'react';
import { QUIZ_CONFIG } from '../constants/config';
import { MESSAGES } from '../constants/messages';
import { sortedLevelKeys } from '../utils/quizHelpers';
import { sendToGoogleSheets } from '../utils/sheetsService';

const ResultsScreen = ({ userName, userPhone, userEmail, results, onRestart }) => {
  const { correctAnswers, totalQuestions, level, breakdown, sectionBreakdown, percentage } = results;
  const [dataSent, setDataSent] = useState(false);
  const [dataError, setDataError] = useState(false);

  // Send data to Google Sheets automatically when results are displayed
  useEffect(() => {
    const sendData = async () => {
      const resultData = {
        userName,
        userPhone,
        userEmail,
        correctAnswers,
        totalQuestions,
        percentage,
        level,
        sectionBreakdown
      };

      const result = await sendToGoogleSheets(resultData);
      if (result.success) {
        setDataSent(true);
      } else {
        setDataError(true);
      }
    };

    sendData();
  }, [userName, userPhone, userEmail, correctAnswers, totalQuestions, percentage, level, sectionBreakdown]);

  // Section names
  const sectionNames = {
    grammar: 'Grammar',
    vocabulary: 'Vocabulary',
    reading: 'Reading'
  };

  // Get level info for styling
  const levelInfo = Object.values(QUIZ_CONFIG.LEVELS).find(l => l.name === level) || {};

  // Check if student should take Test 2
  const shouldTakeTest2 = level.includes('B1+');

  // Share functionality
  const shareText = `I scored ${correctAnswers}/${totalQuestions} (${percentage}%) on the SpeakUp English Placement Test! My level: ${level}`;

  const handleShare = (platform) => {
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText);
        alert('Score copied to clipboard!');
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="quiz-container">
      <div className="results-screen-modern">
        {/* Header */}
        <div className="results-header">
          <img 
            src={QUIZ_CONFIG.LOGOS.blue}
            alt={MESSAGES.accessibility.logoAlt}
            className="results-logo-modern"
          />
          <h1 className="results-title-modern">Your Results</h1>
          <p className="student-name-modern">{userName}</p>
        </div>

        {/* Main Results Grid */}
        <div className="results-grid">
          {/* Left Side - Overall Score */}
          <div className="score-panel">
            <div className="score-circle-wrapper">
              <svg className="score-circle" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#e8f0ff"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={levelInfo.color || '#0e48fe'}
                  strokeWidth="12"
                  strokeDasharray={`${(percentage / 100) * 565} 565`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="score-content">
                <div className="score-number">{correctAnswers}</div>
                <div className="score-total">/ {totalQuestions}</div>
              </div>
            </div>
            
            <h2 className="level-badge" style={{ backgroundColor: levelInfo.color }}>
              {level}
            </h2>
            
            <p className="level-description">
              Your score indicates that your level is in the range of {level} according to the guidelines set by the Common European Framework of Reference (CEFR).
            </p>

            {shouldTakeTest2 && (
              <div className="test2-alert">
                📝 Consider taking Test 2 for more accurate placement at higher levels.
              </div>
            )}

            {/* Share Buttons */}
            <div className="share-section">
              <p className="share-title">Share your score</p>
              <div className="share-buttons">
                <button 
                  className="share-btn facebook" 
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button 
                  className="share-btn linkedin" 
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </button>
                <button 
                  className="share-btn copy" 
                  onClick={() => handleShare('copy')}
                  aria-label="Copy to clipboard"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Data Status */}
            {dataSent && (
              <p className="email-status success">✓ Results saved successfully</p>
            )}
            {dataError && (
              <p className="email-status error">⚠ Google Sheets setup needed</p>
            )}
          </div>

          {/* Right Side - Score Breakdown */}
          <div className="breakdown-panel">
            <h3 className="breakdown-title">Your score explained</h3>
            
            {/* Section Scores */}
            <div className="section-scores">
              {Object.entries(sectionBreakdown).map(([section, data]) => {
                const sectionPercentage = parseFloat(data.percentage);
                return (
                  <div key={section} className="section-score-card">
                    <div className="section-header">
                      <div className="section-circle">
                        <svg width="80" height="80" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="35" fill="none" stroke="#e8f0ff" strokeWidth="6" />
                          <circle 
                            cx="40" 
                            cy="40" 
                            r="35" 
                            fill="none" 
                            stroke="#0e48fe"
                            strokeWidth="6"
                            strokeDasharray={`${(sectionPercentage / 100) * 220} 220`}
                            strokeLinecap="round"
                            transform="rotate(-90 40 40)"
                          />
                        </svg>
                        <div className="section-score-number">{data.correct}</div>
                      </div>
                      <div className="section-info">
                        <h4 className="section-name">{sectionNames[section]} Score</h4>
                        <p className="section-level">{level.split(' - ')[0]}</p>
                      </div>
                    </div>
                    <p className="section-description">
                      You answered {data.correct} out of {data.total} questions correctly ({data.percentage}%)
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Score Comparison Table */}
            <div className="score-comparison">
              <h4 className="comparison-title">Score comparison table</h4>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Beginner</th>
                    <th>Intermediate</th>
                    <th>Advanced</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-label">EF SET</td>
                    <td className={percentage <= 43 ? 'active' : ''}>0-43%</td>
                    <td className={percentage > 43 && percentage <= 85 ? 'active' : ''}>44-85%</td>
                    <td className={percentage > 85 ? 'active' : ''}>86-100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CEFR Level Breakdown */}
            <div className="cefr-breakdown">
              <h4 className="breakdown-subtitle">Performance by CEFR Level</h4>
              {sortedLevelKeys(breakdown).map((levelKey) => {
                const data = breakdown[levelKey];
                const percent = ((data.correct / data.total) * 100).toFixed(0);
                
                return (
                  <div key={levelKey} className="cefr-item">
                    <div className="cefr-header">
                      <span className="cefr-level">{levelKey}</span>
                      <span className="cefr-score">{data.correct}/{data.total} ({percent}%)</span>
                    </div>
                    <div className="cefr-bar">
                      <div 
                        className="cefr-fill"
                        style={{ 
                          width: `${percent}%`,
                          backgroundColor: levelInfo.color || '#0e48fe'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <button 
          onClick={onRestart} 
          className="restart-button-modern"
          aria-label="Take test again"
        >
          Take Test Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
