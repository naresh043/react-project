import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userSlice"
import authReducer from "../features/authSlice"
import enrolledReducer from "../features/enrolledCoursesSlice"

export const store = configureStore({
  reducer: {
    user:userReducer,
    userAuth:authReducer,
    enrolledCourses:enrolledReducer,
  },
})