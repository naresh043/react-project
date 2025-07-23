// src/utils/axiosConfig.js
import axios from "axios";
import { BASE_URL } from "../config/Constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with every request
});

// Optional: Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
