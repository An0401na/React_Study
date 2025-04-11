import React from "react";
import Answer from "./Answer.jsx";

function AnswerList(props) {
  return (
    <section id="answers">
      <Answer />
      <div className="answer">
        <button>dfsf</button>
      </div>
      <div className="answer">
        <button className="selected">dfsf</button>
      </div>
      <div className="answer">
        <button className="correct">dfsf</button>
      </div>
      <div className="answer">
        <button className="wrong">dfsf</button>
      </div>
    </section>
  );
}

export default AnswerList;
