import { configureStore } from "@reduxjs/toolkit";

import cartToggleReducer from "./cart-toggle.js";
import cartReducer from "./cart.js";

const store = configureStore({
  reducer: { cartToggle: cartToggleReducer, cart: cartReducer },
});

export default store;
