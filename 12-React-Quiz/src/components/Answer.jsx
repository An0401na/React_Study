import React, { useState } from "react";

function Answer({ answer }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleAnswerSelect() {
    setIsSelected((prev) => !prev);
  }

  return (
    <p className="answer">
      {/*  selected correct wrong */}
      <button
        className={isSelected ? "selected" : ""}
        type="button"
        onClick={handleAnswerSelect}
      >
        {answer}
      </button>
    </p>
  );
}

export default Answer;
