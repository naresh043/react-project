import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import LogIn from "./Components/Common/Login";
import Layout from "./Layout";
import { addAuth } from "./Redux/features/authSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(true);
  const [appRunner, setAppRunner] = useState(true);
  const isAuth = useSelector((state) => state?.userAuth ?? false);
  const {courseId}=useParams()

  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/auth/`);
        if (cancelled) return;
        dispatch(addAuth(!!response?.data?.authenticated));
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (!cancelled) {
          dispatch(addAuth(false));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [appRunner, dispatch]);
  console.log("auth", isAuth);
  console.log("appRunner", appRunner);

  if (loading) return <div>Loading...</div>; // Optional loading state

  return (
    <>
      <Routes>
        {!isAuth ? (
          <>
            {/* Redirect all routes to login if not authenticated */}
            <Route
              path="/login"
              element={<LogIn setAppRunner={setAppRunner} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout setAppRunner={setAppRunner} />}>
              <Route index element={<ReviewsCards />} />
              <Route path="courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<DynamicPage />} />
              <Route path="roadmap" element={<RoadmapCourseCard />} />
              <Route path="about" element={<AboutSection />} />
              <Route path="enrolledcourses" element={<EnrolledCourses />} />
            </Route>
            {/* Redirect login route to home if authenticated */}
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
