/**
 * Google Sheets Service
 * Sends quiz results to Google Sheets via Apps Script
 */

// Configuration for Google Apps Script
const SHEETS_CONFIG = {
  // Google Apps Script Web App URL
  scriptUrl: 'https://script.google.com/macros/s/AKfycbyfZr2eWY0iA0_KQOLK_M7WHrB36Ll_ilsvJp-bRJb5Wf0wMXxA4uXqFlJ2Rl9ucJbSdg/exec'
};

/**
 * Sends quiz results to Google Sheets
 * @param {Object} resultData - The quiz results data
 * @returns {Promise<Object>} - Success/error status
 */
export const sendToGoogleSheets = async (resultData) => {
  try {
    // Validate configuration
    if (!SHEETS_CONFIG.scriptUrl || SHEETS_CONFIG.scriptUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      console.warn('⚠️ Google Sheets not configured. See GOOGLE_SHEETS_SETUP.md for instructions.');
      return {
        success: false,
        error: 'Configuration needed'
      };
    }

    // Prepare data for Google Sheets
    const dataToSend = {
      timestamp: new Date().toISOString(),
      studentName: resultData.userName,
      totalScore: `${resultData.correctAnswers}/${resultData.totalQuestions}`,
      percentage: `${resultData.percentage}%`,
      level: resultData.level,
      grammarScore: `${resultData.sectionBreakdown.grammar.correct}/${resultData.sectionBreakdown.grammar.total}`,
      vocabularyScore: `${resultData.sectionBreakdown.vocabulary.correct}/${resultData.sectionBreakdown.vocabulary.total}`,
      readingScore: `${resultData.sectionBreakdown.reading.correct}/${resultData.sectionBreakdown.reading.total}`
    };

    // Send to Google Sheets
    await fetch(SHEETS_CONFIG.scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    });

    // Note: no-cors mode doesn't allow reading the response
    // We assume success if no error is thrown
    console.log('✅ Results sent to Google Sheets successfully!');
    
    return {
      success: true,
      message: 'Data sent to Google Sheets'
    };

  } catch (error) {
    console.error('❌ Error sending to Google Sheets:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
