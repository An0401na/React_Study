import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { isActivated: false },
  reducers: {
    activateCart: (state) => {
      state.isActivated = true;
    },
    deactivateCart: (state) => {
      state.isActivated = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
