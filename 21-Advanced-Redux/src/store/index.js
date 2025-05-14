import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart-toggle.js";

const store = configureStore({
  reducer: { cart: cartReducer },
});

export default store;
