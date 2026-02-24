import emailjs from '@emailjs/browser';

// EmailJS Configuration
// TO SET UP:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Add email service (Gmail)
// 4. Create email template with these variables:
//    - {{student_name}}
//    - {{student_email}}
//    - {{total_score}}
//    - {{total_questions}}
//    - {{percentage}}
//    - {{level}}
//    - {{grammar_score}}
//    - {{vocabulary_score}}
//    - {{reading_score}}
//    - {{date}}
// 5. Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY below

const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
};

/**
 * Sends test results via email to specified recipient
 * @param {Object} resultData - Test result data
 * @returns {Promise} EmailJS send promise
 */
export const sendResultsEmail = async (resultData) => {
  const {
    userName,
    userEmail = 'no-email-provided@example.com',
    correctAnswers,
    totalQuestions,
    percentage,
    level,
    sectionBreakdown
  } = resultData;

  const templateParams = {
    to_email: 'ruan.speakup@gmail.com',
    student_name: userName,
    student_email: userEmail,
    total_score: correctAnswers,
    total_questions: totalQuestions,
    percentage: percentage,
    level: level,
    grammar_score: `${sectionBreakdown.grammar.correct}/${sectionBreakdown.grammar.total} (${sectionBreakdown.grammar.percentage}%)`,
    vocabulary_score: `${sectionBreakdown.vocabulary.correct}/${sectionBreakdown.vocabulary.total} (${sectionBreakdown.vocabulary.percentage}%)`,
    reading_score: `${sectionBreakdown.reading.correct}/${sectionBreakdown.reading.total} (${sectionBreakdown.reading.percentage}%)`,
    date: new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

/**
 * Alternative: Send results to a backend API
 * Use this if you prefer a server-side solution
 */
export const sendResultsToAPI = async (resultData) => {
  try {
    const response = await fetch('/api/save-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save results');
    }
    
    return { success: true };
  } catch (error) {
    console.error('API call failed:', error);
    return { success: false, error };
  }
};
