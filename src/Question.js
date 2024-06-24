import React from "react";


function Question({ question, sectionIndex, questionIndex, value, onChange }) {
  const handleSliderChange = (event) => {
    onChange(sectionIndex, questionIndex, Number(event.target.value));
  };

  return (
    <div className="question">
      <h2>{question}</h2>
      <input
        type="range"
        min="0"
        max="100"
        step="25"
        value={value !== null ? value : 50}
        onChange={handleSliderChange}
      />
      <div className="labels">
        <span>Strongly Disagree</span>
        <span>Disagree</span>
        <span>Neutral</span>
        <span>Agree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
}

export default Question;
