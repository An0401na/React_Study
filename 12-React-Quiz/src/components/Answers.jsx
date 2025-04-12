import React, { useState } from "react";

function Answers({
  answers,
  selectedAnswer,
  correctAnswer,
  onAnswerSelect,
  quizStage,
}) {
  console.log("Answers 리렌더링");

  function handleAnswerSelect(answer) {
    onAnswerSelect(answer);
  }
  console.log("correctAnswer", correctAnswer);

  return (
    <section id="answers">
      {answers.map((answer) => {
        let className = "";

        if (quizStage === "showSelectedAnswer") {
          className = answer === selectedAnswer ? "selected" : "";
        } else if (quizStage === "showCorrectAnswer") {
          if (answer === selectedAnswer) {
            className = "wrong";
          }
          if (answer === correctAnswer) {
            className = "correct";
          }
        }

        return (
          <p key={answer} className="answer">
            <button
              className={className}
              disabled={quizStage !== "quiz"}
              type="button"
              onClick={() => handleAnswerSelect(answer)}
            >
              {answer}
            </button>
          </p>
        );
      })}
    </section>
  );
}

export default Answers;
