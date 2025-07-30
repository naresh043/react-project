// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Layout and Components
import Layout from "../Layout";
import ETechLandingPage from "../LandingPage/Landing";
import LogIn from "../Components/Common/Login";
import SignUp from "../Components/Common/SiginUp";
import Courses from "../Components/Courses/courses";
import DynamicPage from "../Components/Courses/dynmicPage";
import ReviewsCards from "../Components/Home/reviews-cards";
import RoadmapCourseCard from "../Components/Roadmaps/roadmap_card";
import AboutSection from "../Components/About/about";
import EnrolledCourses from "../Components/EnrolledCourses/enrolled";
import ProfileComponent from "../Components/About/ProfileComponent";
import CoursesCompleted from "../Components/About/CoursesCompleted ";
import AccountSettings from "../accountSettings/AccountSettings";

const AppRoutes = ({ isAuth }) => {
  return (
    <Routes>
      {/* Public Routes */}
      {!isAuth ? (
        <>
          <Route path="/" element={<ETechLandingPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          {/* Authenticated Routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<ReviewsCards />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<DynamicPage />} />
            <Route path="roadmap" element={<RoadmapCourseCard />} />
            <Route path="about" element={<AboutSection />} />
            <Route path="enrolledcourses" element={<EnrolledCourses />} />
            <Route path="/me" element={<ProfileComponent />} />
            <Route path="/me/coursescompleted" element={<CoursesCompleted />} />
            <Route path="/me/account-settings" element={<AccountSettings />} />
          </Route>
          {/* Redirect login/signup to dashboard if already logged in */}
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
