import React from 'react';
import { QUIZ_CONFIG } from '../constants/config';
import { MESSAGES } from '../constants/messages';

const WelcomeScreen = ({ userName, setUserName, userPhone, setUserPhone, userEmail, setUserEmail, onStart, error, totalQuestions }) => {
  return (
    <div className="quiz-container">
      <div className="welcome-screen">
        <img 
          src={QUIZ_CONFIG.LOGOS.white}
          alt={MESSAGES.accessibility.logoAlt}
          className="welcome-logo"
        />
        <h1>{MESSAGES.welcome.title}</h1>
        <p className="welcome-text">
          {MESSAGES.welcome.subtitle}
        </p>
        <p className="welcome-text">
          {MESSAGES.welcome.description(totalQuestions)}
        </p>
        <form onSubmit={onStart} className="name-form">
          <label htmlFor="userName">{MESSAGES.welcome.nameLabel}</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={MESSAGES.welcome.namePlaceholder}
            className="name-input"
            autoComplete="name"
            autoFocus
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'name-error' : undefined}
          />
          
          <label htmlFor="userPhone">Telefone</label>
          <input
            type="tel"
            id="userPhone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="(11) 99999-9999"
            className="name-input"
            autoComplete="tel"
            aria-required="true"
          />
          
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="name-input"
            autoComplete="email"
            aria-required="true"
          />
          
          {error && (
            <div id="name-error" className="error-message" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="start-button">
            {MESSAGES.welcome.startButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
