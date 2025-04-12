import React from "react";
import quizLogoImg from "../assets/quiz-complete.png";

function Summary(props) {
  return (
    <section id="summary">
      <img src={quizLogoImg} alt="Quiz Logo Image" />
      <h2>QUIZ COMPLETED!</h2>
      <div id="summary-stats">
        <span>
          <p className="number">0%</p>
          <p className="text">SKIPPEND</p>
        </span>
        <span>
          <p className="number">0%</p>
          <p className="text">SKIPPEND</p>
        </span>
        <span>
          <p className="number">0%</p>
          <p className="text">SKIPPEND</p>
        </span>
      </div>
      <ol>
        <li>
          <h3>1</h3>
          <div className="question">question?????</div>
          <div className="user-answer correct">sssssssss</div>
        </li>
        <li>
          <h3>1</h3>
          <div className="question">question?????</div>
          <div className="user-answer wrong">sssssssss</div>
        </li>
        <li>
          <h3>1</h3>
          <div className="question">question?????</div>
          <div className="user-answer skipped">sssssssss</div>
        </li>
      </ol>
    </section>
  );
}

export default Summary;
