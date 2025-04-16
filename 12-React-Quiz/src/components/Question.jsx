import ProgressBar from "./ProgressBar.jsx";

function Question({ question, time, isAnswered, onTimeOut }) {
  return (
    <section id="question">
      <ProgressBar time={time} isAnswered={isAnswered} onTimeOut={onTimeOut} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
