import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { isActivated: false },
  reducers: {
    toggleCart(state) {
      state.isActivated = !state.isActivated;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
