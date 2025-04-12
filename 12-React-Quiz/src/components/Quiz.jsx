import React, { useCallback, useEffect, useState } from "react";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";

function Quiz({ quizs, onQuizEnd }) {
  console.log("Quiz 리렌더링");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const quiz = quizs[currentQuizIndex];

  const [quizStage, setQuizStage] = useState("quiz"); // "quiz" or "showSelectedAnswer" or "showCorrectAnswer"
  const time = (quizStage === "quiz" ? 10 : 2) * 1000;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    // quizStage가 "quiz"일 때는 10초, "showSelectedAnswer"이거나"showCorrectAnswer"일 때는 2초
    console.log("Timer started for quizStage: ", quizStage, "time: ", time);
    const timer = setTimeout(() => {
      if (quizStage === "quiz") {
        setQuizStage("showCorrectAnswer");
      } else if (quizStage === "showSelectedAnswer") {
        setQuizStage("showCorrectAnswer");
      } else if (quizStage === "showCorrectAnswer") {
        handleNextQuestion();
      }
    }, time);

    return () => {
      console.log("Timer cleared");
      clearTimeout(timer);
    };
  }, [currentQuizIndex, quizStage, selectedAnswer]);

  function handleNextQuestion() {
    console.log("currentQuizIndex", currentQuizIndex);
    if (currentQuizIndex >= quizs.length - 1) {
      onQuizEnd("summary");
      return;
    }

    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    setQuizStage("quiz");
  }
  function handleSkipClick() {
    setQuizStage("showCorrectAnswer");
  }
  function handleAnswerSelect(answer) {
    setSelectedAnswer(answer);
    setQuizStage("showSelectedAnswer");
  }

  return (
    <section id="quiz">
      <div>
        {quiz.id} {quizStage}
      </div>
      <Question
        key={`${currentQuizIndex}-${quizStage}`}
        question={quiz.text}
        time={time}
        isAnswered={quizStage !== "quiz"}
      />
      <Answers
        answers={quiz.answers}
        selectedAnswer={selectedAnswer}
        correctAnswer={quiz.correctAnswer}
        onAnswerSelect={handleAnswerSelect}
      />
      <div id="skip-action">
        {quizStage === "quiz" && (
          <button type="button" onClick={handleSkipClick}>
            Skip
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;
