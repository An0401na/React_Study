import React from "react";
import Question from "./Question.jsx";
import AnswerList from "./AnswerList.jsx";

function Quiz(props) {
  return (
    <section id="quiz">
      <Question />
      <AnswerList />
    </section>
  );
}

export default Quiz;
