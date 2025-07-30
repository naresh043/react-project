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
import SignUp from "./Components/Common/SiginUp";
import LogIn from "./Components/Common/Login";
import CoursesCompleted from "./Components/About/CoursesCompleted ";
import AccountSettings from "./accountSettings/AccountSettings";
import ETechLandingPage from "./LandingPage/Landing";
import Loading from "./Components/Common/loading";

import Layout from "./Layout";
import { addAuth } from "./Redux/features/authSlice";
import { ToastContainer } from "react-toastify";
import { addUser } from "./Redux/features/userSlice";
import { getProfile } from "./utils/getUser";

function App() {
  const isAuth = useSelector((state) => state?.userAuth ?? false);
  const isUser = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const userData = await getProfile();
      if (userData) {
        dispatch(addUser(userData));
      }
    } catch (error) {
      // Optionally handle error with a toast
      console.error("Error fetching profile in component:", error);
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
    if (!isUser) fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [dispatch, isAuth, isUser]);

  // console.log("appRunner", appRunner);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Routes>
        {!isAuth ? (
          <>
            {/* Show landing page for unauthenticated users at root path */}
            <Route path="/" element={<ETechLandingPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Redirect any unknown route to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {/* Show authenticated dashboard layout and subroutes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<ReviewsCards />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:courseId" element={<DynamicPage />} />
              <Route path="roadmap" element={<RoadmapCourseCard />} />
              <Route path="about" element={<AboutSection />} />
              <Route path="enrolledcourses" element={<EnrolledCourses />} />

              <Route path="/me" element={<ProfileComponent />} />
              <Route
                path="/me/coursescompleted"
                element={<CoursesCompleted />}
              />
              <Route path="/me/account-settings" element={<AccountSettings/>} />
            </Route>
            {/* Prevent access to login/signup if already logged in */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
