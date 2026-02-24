# Quiz Setup Guide

## Filling in Question Templates

This guide explains how to fill in the question templates for your Pearson Course Placement Test.

### File Structure

The quiz is divided into 4 sections across 4 files:

1. **src/data/listeningQuestions.js** - Questions 1-20 (Listening Comprehension)
2. **src/data/grammarQuestions.js** - Questions 21-50 (Grammar)
3. **src/data/vocabularyQuestions.js** - Questions 51-70 (Vocabulary)
4. **src/data/readingQuestions.js** - Questions 71-80 (Reading Comprehension)

### Total: 80 Questions

---

## 1. Listening Questions (listeningQuestions.js)

### Audio Setup

At the top of the file, you'll find:

```javascript
const audioUrl = 'https://speakupcataguases.com/BRE_course_placement_test1_00.mp3';
```

- **Action Required**: Make sure this audio file is accessible and hosted at this URL
- The audio file should contain all listening segments for questions 1-20

### Question Format

Each listening question has this structure:

```javascript
{
  id: 1,
  section: 'listening',
  audioSegment: 1, // Groups questions by audio track (1-5)
  level: 'A1',
  question: '[Insert question text here]',
  options: [
    '[Option A]',
    '[Option B]',
    '[Option C]'
  ],
  correct: 0 // Index of correct answer (0 = A, 1 = B, 2 = C)
}
```

### Steps to Fill:

1. Replace `[Insert question text here]` with the actual question
2. Replace `[Option A]`, `[Option B]`, `[Option C]` with the actual options
3. Set the `correct` index (0, 1, or 2) for the correct answer
4. Assign appropriate `level` (A1, A2, B1, B2, C1)
5. Group questions by `audioSegment` (1-5) - questions that share the same audio track should have the same audioSegment number

### Example:

```javascript
{
  id: 1,
  section: 'listening',
  audioSegment: 1,
  level: 'A1',
  question: 'What time does the store open?',
  options: [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM'
  ],
  correct: 1 // 9:00 AM is correct
}
```

---

## 2. Grammar Questions (grammarQuestions.js)

### Question Format

```javascript
{
  id: 21,
  section: 'grammar',
  level: 'A1',
  question: '[Insert grammar question here]',
  options: [
    '[Option A]',
    '[Option B]',
    '[Option C]',
    '[Option D]'
  ],
  correct: 0 // Index of correct answer
}
```

### Steps to Fill:

1. Replace `[Insert grammar question here]` with the actual question
2. Replace the 4 options with actual choices
3. Set the `correct` index (0, 1, 2, or 3)
4. Assign appropriate `level` (A1, A2, B1, B2, C1)

### Example:

```javascript
{
  id: 21,
  section: 'grammar',
  level: 'A1',
  question: 'She _____ to school every day.',
  options: [
    'go',
    'goes',
    'going',
    'gone'
  ],
  correct: 1 // "goes" is correct
}
```

---

## 3. Vocabulary Questions (vocabularyQuestions.js)

### Question Format

Same structure as grammar questions:

```javascript
{
  id: 51,
  section: 'vocabulary',
  level: 'A1',
  question: '[Insert vocabulary question here]',
  options: [
    '[Option A]',
    '[Option B]',
    '[Option C]',
    '[Option D]'
  ],
  correct: 0
}
```

### Steps to Fill:

Same as grammar section - replace placeholders with actual content.

### Example:

```javascript
{
  id: 51,
  section: 'vocabulary',
  level: 'B1',
  question: 'The opposite of "difficult" is:',
  options: [
    'hard',
    'easy',
    'complex',
    'tough'
  ],
  correct: 1 // "easy" is correct
}
```

---

## 4. Reading Questions (readingQuestions.js)

### Special Structure

Reading questions are grouped by text passages. Each passage has multiple questions.

### Text Object Format:

```javascript
{
  textId: 1,
  textTitle: '[Insert passage title]',
  text: `[Insert full reading passage here.
  
  Multiple paragraphs can be included.
  
  Each paragraph will be displayed properly.]`
}
```

### Question Format (with textId reference):

```javascript
{
  id: 71,
  section: 'reading',
  textId: 1, // Links to the text above
  level: 'B1',
  question: '[Question about the passage]',
  options: [
    '[Option A]',
    '[Option B]',
    '[Option C]',
    '[Option D]'
  ],
  correct: 0
}
```

### Steps to Fill:

1. **For Text Objects**:
   - Replace `[Insert passage title]` with actual title
   - Replace the entire text content with the actual reading passage
   - Keep the backticks (`) for multi-line text

2. **For Questions**:
   - Link each question to its passage using `textId`
   - Fill in questions and options as usual
   - Set correct answer index

### Example:

```javascript
// Text
{
  textId: 1,
  textTitle: 'The Benefits of Exercise',
  text: `Regular exercise has many health benefits. It can help you maintain a healthy weight, reduce your risk of heart disease, and improve your mental health.

  Doctors recommend at least 30 minutes of moderate exercise most days of the week. This can include activities like walking, swimming, or cycling.

  Starting an exercise routine can be challenging, but the rewards are worth it.`
}

// Questions for this text
{
  id: 71,
  section: 'reading',
  textId: 1,
  level: 'B1',
  question: 'According to the passage, how much exercise do doctors recommend?',
  options: [
    '15 minutes per day',
    '30 minutes most days',
    '1 hour every day',
    '2 hours per week'
  ],
  correct: 1
}
```

---

## Level Assignments

Use these CEFR levels appropriately:

- **A1**: Beginner (basic phrases, simple questions)
- **A2**: Elementary (everyday expressions, simple exchanges)
- **B1**: Intermediate (main points of clear standard input)
- **B2**: Upper Intermediate (complex texts, fluent interaction)
- **C1**: Advanced (wide range of demanding texts)

---

## Testing Your Quiz

### After filling in questions:

1. **Check IDs**: Ensure all question IDs are sequential (1-80)
2. **Verify Correct Answers**: Double-check all `correct` indices
3. **Test Audio**: Make sure the audio file plays correctly
4. **Review Levels**: Confirm level assignments are appropriate
5. **Check Text IDs**: For reading section, verify all questions link to correct passages

### Running the Quiz:

```bash
npm start
```

Then test the quiz from start to finish to ensure:
- All questions display correctly
- Audio plays properly for listening section
- Reading passages show correctly with their questions
- Results calculate properly for all 4 sections

---

## Common Issues

### Audio Not Playing
- Verify the audio file URL is correct and accessible
- Check that the file format is supported (MP3 is recommended)
- Ensure CORS headers are set if hosted on a different domain

### Questions Not Showing
- Check for syntax errors in the JavaScript files
- Ensure all commas are in place in the arrays
- Verify no duplicate IDs

### Incorrect Scoring
- Verify all `correct` values are valid indices (0-based)
- Check that grammar has 30 questions (21-50)
- Ensure vocabulary has 20 questions (51-70)

---

## Need Help?

Check these files for reference:
- **ARCHITECTURE.md** - System architecture overview
- **STYLE_GUIDE.md** - Code style guidelines
- **README.md** - General project information

---

**Remember**: You are responsible for ensuring you have the proper licensing and rights to use the test content you insert into these templates.
