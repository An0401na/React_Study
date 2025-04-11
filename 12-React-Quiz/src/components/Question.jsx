import React from "react";

function Question() {
  return (
    <section id="question">
      <progress value={3} max={10} />
      <h2>How do you typically render list content in React apps?</h2>
    </section>
  );
}

export default Question;
