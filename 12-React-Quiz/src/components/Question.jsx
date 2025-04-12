import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 10000;
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
  }, [onTimeExpired, question]);

  return (
    <section id="question">
      <ProgressBar timer={TIMER} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
