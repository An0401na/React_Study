import React from "react";
import _ from "lodash";

function Answers({ answers }) {
  const shuffledAnswers = _.shuffle(answers);
  return (
    <section id="answers">
      {shuffledAnswers.map((answer) => (
        <p key={answer} className="answer">
          {/*  selected correct wrong */}
          <button className="selected">{answer}</button>
        </p>
      ))}
    </section>
  );
}

export default Answers;
