import React, { useState } from "react";

function Answers({ answers, correctAnswer }) {
  console.log("Answers 리렌더링");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  function handleAnswerSelect(answer) {
    setSelectedAnswer(answer);
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
