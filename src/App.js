import React, { useState } from 'react';
import './App.css';
import Question from './Question';
import ProgressBar from './ProgressBar';

const sections = [
  {
    title: "IDEALISTIC",
    questions: [
      "I have ambitious aims of making a difference.",
      "I have spent fewer than 4 years in full-time service or ministry.",
      "I'm beginning to believe the journey of service will be much harder than I anticipated.",
      "I believe I can change the world.",
      "I feel very optimistic about my future."
    ]
  },
  {
    title: "DISILLUSIONED",
    questions: [
      "I am beginning to feel burned out.",
      "I often feel overwhelmed by my responsibilities.",
      "I question the impact of my work.",
      "I feel disconnected from my original goals.",
      "I am losing motivation in my work."
    ]
  },
  {
    title: "CYNICAL",
    questions: [
      "I doubt the intentions of others.",
      "I feel that most people are selfish.",
      "I am often skeptical of new ideas.",
      "I find it hard to trust others.",
      "I believe people are inherently untrustworthy."
    ]
  }
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    sections.map(section => Array(section.questions.length).fill(null))
  );

  const handleSliderChange = (sectionIndex, questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[sectionIndex][questionIndex] = value;
    setAnswers(newAnswers);

    if (questionIndex < sections[sectionIndex].questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else if (sectionIndex < sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
      setCurrentQuestion(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sections[currentSection].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = answers.flat().filter(answer => answer !== null).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="App">
      <header className="App-header">
        <div className="progress-container">
          <ProgressBar progress={progress} />
          <div className="progress-labels">
            {sections.map(section => (
              <span key={section.title}>{section.title}</span>
            ))}
          </div>
        </div>
        <Question
          question={sections[currentSection].questions[currentQuestion]}
          sectionIndex={currentSection}
          questionIndex={currentQuestion}
          value={answers[currentSection][currentQuestion]}
          onChange={handleSliderChange}
        />
        <div className="navigation">
          <button onClick={handlePrev} disabled={currentSection === 0 && currentQuestion === 0}>Prev</button>
          <span>{currentQuestion + 1}/{sections[currentSection].questions.length}</span>
          <button onClick={handleNext} disabled={currentSection === sections.length - 1 && currentQuestion === sections[currentSection].questions.length - 1}>Next</button>
        </div>
      </header>
    </div>
  );
}

export default App;
