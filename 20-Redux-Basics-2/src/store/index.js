import { createStore } from "redux";

// 리듀스 함수
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type == "INCREMENT") {
    return { counter: state.counter + 1 };
  }

  if (action.type == "DECREMENT") {
    return { counter: state.counter - 1 };
  }

  return state;
};

// 스토어 생성
const store = createStore(counterReducer);

export default store;
