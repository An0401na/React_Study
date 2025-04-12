import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Summary from "./components/Summary.jsx";
import QUIZS from "./questions.js";
import _ from "lodash";
import { useState } from "react";

function App() {
  console.log("App 재랜더링");
  //Todo: useState로 viewMode를 관리 (quiz, summary)
  const [viewMode, setViewMode] = useState("quiz");
  const shuffledQuizs = _.shuffle(QUIZS);
  console.log(shuffledQuizs);

  function handleViewModeChange(newViewMode) {
    setViewMode(newViewMode);
  }

  return (
    <>
      <Header />
      {/*//Todo : shuffledQuizs로 바꾸기*/}
      {/*  <Quiz quizs={shuffledQuizs} />*/}
      {viewMode === "quiz" ? (
        <Quiz quizs={QUIZS} onQuizEnd={handleViewModeChange} />
      ) : (
        <Summary />
      )}
    </>
  );
}
export default App;
