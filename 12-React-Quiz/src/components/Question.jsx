import React from "react";

function Question({ question }) {
  return (
    <section id="question">
      <progress value={3} max={10} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
