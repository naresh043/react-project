import { createSlice } from "@reduxjs/toolkit";
export const userAuth = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    addAuth: (state, action) => {
      return action.payload;
    },
    removeAuth: (state, action) => null,
  },
});

// Action creators are generated for each case reducer function
export const { addAuth, removeAuth } = userAuth.actions;

export default userAuth.reducer;
