import React, { useCallback, useEffect, useState } from "react";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";

function Quiz({ quizs, onQuizEnd }) {
  console.log("Quiz 리렌더링");
  const [currentIndex, setCurrentIndex] = useState(0);
  const quiz = quizs[currentIndex];

  const handleNextQuestion = useCallback(
    function handleNextQuestion() {
      console.log("currentIndex", currentIndex);
      if (currentIndex >= quizs.length - 1) {
        onQuizEnd("summary");
        return;
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
    },
    [currentIndex, quizs.length, onQuizEnd],
  );

  return (
    <section id="quiz">
      <div>{quiz.id}</div>
      <Question question={quiz.text} onTimeExpired={handleNextQuestion} />
      <Answers answers={quiz.answers} />
      <div id="skip-action">
        <button type="button" onClick={handleNextQuestion}>
          Skip
        </button>
      </div>
    </section>
  );
}

export default Quiz;
