import ProgressBar from "./ProgressBar.jsx";

function Question({ question, quizStage, onTimeOut }) {
  return (
    <section id="question">
      <ProgressBar quizStage={quizStage} onTimeOut={onTimeOut} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
