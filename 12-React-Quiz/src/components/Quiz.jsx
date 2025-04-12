import React, { useEffect, useState } from "react";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";

function Quiz({ quizs }) {
  console.log("Quiz 리렌더링");
  const [currentIndex, setCurrentIndex] = useState(0);
  const quiz = quizs[currentIndex];

  function handleSkipClick() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <section id="quiz">
      <div>{quiz.id}</div>
      <Question question={quiz.text} />
      <Answers answers={quiz.answers} />
      <div id="skip-action">
        <button type="button" onClick={handleSkipClick}>
          Skip
        </button>
      </div>
    </section>
  );
}

export default Quiz;
