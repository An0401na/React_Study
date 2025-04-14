import { createContext, useReducer, useState } from "react";

export const UserAnswerContext = createContext({
  userAnswer: [], // 문제, 선택한 답, 결과(skip, correct, wrong)를 값으로 하는 객체를 배열로 저장
  // [{ question: "문제", selectedAnswer: "선택한 답", result: "skip" | "correct" | "wrong" }]
  addUserAnswer: () => {},
});

export default function UserAnswerContextProvider({ children }) {
  const [userAnswerState, setUserAnswerState] = useState([]);

  function handleAddUserAnswer(answer) {
    setUserAnswerState((prevUserAnswer) => {
      const updatedUserAnswer = [...prevUserAnswer, answer];
      return updatedUserAnswer;
    });
  }

  const ctxValue = {
    userAnswer: userAnswerState,
    addUserAnswer: handleAddUserAnswer,
  };

  return (
    <UserAnswerContext.Provider value={ctxValue}>
      {children}
    </UserAnswerContext.Provider>
  );
}
