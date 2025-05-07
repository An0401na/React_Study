const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  return { count: state.count + 1 };
};

const store = redux.createStore(counterReducer); // redux 저장소 생성

const counterSubscriber = () => {
  // 현재 상태를 가져옴 (구독중)
  const latestState = store.getState(); // 상태가 변경될때 마다 트리거 되어 최신 상태로 변경
  console.log("구독중 : ", latestState);
};

store.subscribe(counterSubscriber);
