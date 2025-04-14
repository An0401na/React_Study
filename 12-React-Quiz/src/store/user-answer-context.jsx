import { createContext, useReducer } from "react";

export const UserAnswerContext = createContext({
  userAnswer: [],
  addUserAnswer: () => {},
});
// 문제 순서를 키로 하고 문제, 선택한 답, 결과를 값으로 하는 객체를 배열로 저장 skip, 정답 맞춤, 못맞춤 읠 결과로 둔다.
// [{id: 0, answer: 0, result: "skip"}, {id: 1, answer: 1, result: "correct"}, {id: 2, answer: 2, result: "incorrect"}]

function userAnswerContextReducer(state, action) {
  return state;
}

export default function UserAnswerContextProvider({ children }) {
  const [userAnswer, userAnswerDispatch] = useReducer(
    userAnswerContextReducer,
    {
      userAnswer: [],
    },
  );

  function addUserAnswer(answer) {
    const updatedUserAnswer = [...userAnswer.userAnswer];
    updatedUserAnswer.push(answer);

    return updatedUserAnswer;
  }

  const ctxValue = {
    userAnswer: userAnswer,
    addUserAnswer: addUserAnswer,
  };

  return (
    <UserAnswerContext.Provider value={ctxValue}>
      {children}
    </UserAnswerContext.Provider>
  );
}
