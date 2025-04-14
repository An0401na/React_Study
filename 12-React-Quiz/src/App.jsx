import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Summary from "./components/Summary.jsx";
import QUIZS from "./questions.js";
import _ from "lodash";
import { useState } from "react";
import UserAnswerContextProvider from "./store/user-answer-context.jsx";

function App() {
  console.log("App 재랜더링");
  const [viewMode, setViewMode] = useState("quiz");
  const shuffledQuizs = _.shuffle(QUIZS).map((quiz) => ({
    ...quiz,
    answers: _.shuffle(quiz.answers),
    correctAnswer: quiz.answers[0],
  }));

  console.log(shuffledQuizs);

  function handleViewModeChange(newViewMode) {
    setViewMode(newViewMode);
  }

  return (
    <UserAnswerContextProvider>
      <Header />
      {/*//Todo : shuffledQuizs로 바꾸기*/}
      {/*  <Quiz quizs={shuffledQuizs} />*/}
      {viewMode === "quiz" ? (
        <Quiz quizs={QUIZS} onQuizEnd={handleViewModeChange} />
      ) : (
        <Summary />
      )}
    </UserAnswerContextProvider>
  );
}
export default App;
