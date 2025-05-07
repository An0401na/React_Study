const redux = require("redux");

const counterReducer = (state, action) => {
  return { count: state.count + 1 };
};

const store = redux.createStore(counterReducer); // redux 저장소 생성

const counterSubscriber = () => {
  // 현재 상태를 가져옴 (구독중)
  store.getState(); // 상태가 변경될때 마다 트리거 되어 최신 상태로 변경
};
