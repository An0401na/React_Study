import React from "react";

const TIMER = 3000;
function Question({ question, onTimeExpired }) {
  console.log("Timer started");
  const timer = setTimeout(() => {
    onTimeExpired();
  }, TIMER);

  return (
    <section id="question">
      <progress value={3} max={10} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
