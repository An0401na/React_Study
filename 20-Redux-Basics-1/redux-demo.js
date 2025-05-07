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

store.subscribe(counterSubscriber); // 구독함수를 등록

store.dispatch({
  type: "INCREMENT", // 액션 객체를 디스패치
}); // 액션을 디스패치하여 상태를 변경, 액션을 발송하는 메소드
