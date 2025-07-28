// utils/user.js
import axiosInstance from "../config/axiosConfig";

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/users/profile");
    const userData = response?.data?.data;

    if (userData) {
      return userData;
    } else {
      console.warn("User profile data is empty");
      return null;
    }
  } catch (err) {
    console.error("Failed to fetch user profile:", err.message);
    throw err; // so the caller can handle errors
  }
};
