import { createSlice } from "@reduxjs/toolkit";

const cartToggleSlice = createSlice({
  name: "cart",
  initialState: { cartIsVisible: false },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const cartToggleActions = cartToggleSlice.actions;
export default cartToggleSlice.reducer;
