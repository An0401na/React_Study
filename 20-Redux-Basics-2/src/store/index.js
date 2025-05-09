import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

// 스토어 생성
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
