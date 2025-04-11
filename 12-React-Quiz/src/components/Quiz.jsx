import React from "react";

function Quiz(props) {
  return (
    <section id="quiz">
      <section id="question">
        <progress value={3} max={10} />
        <h2>How do you typically render list content in React apps?</h2>
      </section>
      <section id="answers">
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
    </section>
  );
}

export default Quiz;
