import { createSlice } from "@reduxjs/toolkit";
export const enrolledCourseSlice = createSlice({
  name: "enrolledCourses",
  initialState: null,
  reducers: {
    addExistedEnrolls: (state, action) => {
      return action.payload;
    },
    removeExistedEnrolls: (state, action) => null,
  },
});

// Action creators are generated for each case reducer function
export const { addExistedEnrolls, removeExistedEnrolls } =
  enrolledCourseSlice.actions;

export default enrolledCourseSlice.reducer;
