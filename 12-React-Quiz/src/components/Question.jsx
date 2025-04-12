import React, { useEffect } from "react";

const TIMER = 3000;
function Question({ question, onTimeExpired }) {
  useEffect(() => {
    console.log("Timer started");
    const timer = setTimeout(() => {
      onTimeExpired();
    }, TIMER);

    return () => {
      console.log("Timer cleared");
      clearTimeout(timer);
    };
  }, [onTimeExpired]);

  return (
    <section id="question">
      <progress value={3} max={TIMER} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
