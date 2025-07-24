import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "./config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "./config/Constants";
import Courses from "./Components/Courses/courses";
import ReviewsCards from "./Components/Home/reviews-cards";
import DynamicPage from "./Components/Courses/dynmicPage";
import RoadmapCourseCard from "./Components/Roadmaps/roadmap_card";
import AboutSection from "./Components/About/about";
import EnrolledCourses from "./Components/EnrolledCourses/enrolled";
import ProfileComponent from "./Components/About/ProfileComponent";
import LogIn from "./Components/Common/Login";


import Layout from "./Layout";
import { addAuth } from "./Redux/features/authSlice";
import { ToastContainer } from "react-toastify";
import { addUser } from "./Redux/features/userSlice";

function App() {
  const isAuth = useSelector((state) => state?.userAuth ?? false);
  const isUser = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/users/profile");
      const userData = response?.data?.data;
      if (userData) {
        dispatch(addUser(userData));
      } else {
        console.warn("User profile data is empty");
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err.message);
    }
  };
  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/auth/`);
        if (!cancelled) {
          dispatch(addAuth(!!response?.data?.authenticated));
        }
      } catch (error) {
        console.error("Error checking authentication:", error.message);
        if (!cancelled) {
          dispatch(addAuth(false));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // Call only if not authenticated or user not in store
    if (!isAuth) checkAuth();
    if (!isUser) getProfile();

    return () => {
      cancelled = true;
    };
  }, [ dispatch, isAuth, isUser]);

  // console.log("appRunner", appRunner);

  if (loading) return <div>Loading...</div>; // Optional loading state

  return (
    <>
      <Routes>
        {!isAuth ? (
          <>
            {/* Redirect all routes to login if not authenticated */}
            <Route
              path="/login"
              element={<LogIn  />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<ReviewsCards />} />
              <Route path="courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<DynamicPage />} />
              <Route path="roadmap" element={<RoadmapCourseCard />} />
              <Route path="about" element={<AboutSection />} />
              <Route path="enrolledcourses" element={<EnrolledCourses />} />
              <Route path="/me" element={<ProfileComponent/>}/>
            </Route>
            {/* Redirect login route to home if authenticated */}
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
