import React, { useState } from "react";

function Answers({ answers, selectedAnswer, correctAnswer, onAnswerSelect }) {
  console.log("Answers 리렌더링");

  function handleAnswerSelect(answer) {
    onAnswerSelect(answer);
  }

  return (
    <section id="answers">
      <p className="answer">
        {/*  selected correct wrong */}
        <button className="selected">123</button>
      </p>
      {answers.map((answer) => (
        <p key={answer} className="answer">
          {/*  selected correct wrong */}
          <button
            className={answer === selectedAnswer ? "selected" : ""}
            disabled={selectedAnswer !== ""}
            type="button"
            onClick={() => handleAnswerSelect(answer)}
          >
            {answer}
          </button>
        </p>
      ))}
    </section>
  );
}

export default Answers;
