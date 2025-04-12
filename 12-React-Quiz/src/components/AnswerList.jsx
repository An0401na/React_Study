import React from "react";
import _ from "lodash";
import QUIZS from "../questions.js";
import Answer from "./Answer.jsx";

function AnswerList({ answers }) {
  const shuffledAnswers = _.shuffle(answers);
  return (
    <section id="answers">
      <p className="answer">
        {/*  selected correct wrong */}
        <button className="selected">123</button>
      </p>
      {shuffledAnswers.map((answer) => (
        <Answer answer={answer} key={answer} />
      ))}
    </section>
  );
}

export default AnswerList;
