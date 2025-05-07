const redux = require("redux");

const counterReducer = (state, action) => {
  return { count: state.count + 1 };
};

const store = redux.createStore(counterReducer); // redux 저장소 생성
