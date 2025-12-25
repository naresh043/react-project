import { Routes, Route } from "react-router-dom";
import AppInitializer from "./AppInitializer";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Layout from "./Layout";
import ETechLandingPage from "./LandingPage/Landing";
import Login from "./Components/Common/Login";
import SignUp from "./Components/Common/SiginUp";

import Courses from "./Components/Courses/courses";
import DynamicPage from "./Components/Courses/dynmicPage";
import ReviewsCards from "./Components/Home/reviews-cards";
import RoadmapCourseCard from "./Components/Roadmaps/roadmap_card";
import AboutSection from "./Components/About/about";
import EnrolledCourses from "./Components/EnrolledCourses/enrolled";
import ProfileComponent from "./Components/About/ProfileComponent";
import CoursesCompleted from "./Components/About/CoursesCompleted ";
import AccountSettings from "./accountSettings/AccountSettings";

import { ToastContainer } from "react-toastify";

function App() {
  
  return (
    <AppInitializer>
      <Routes>

         
        <Route element={<PublicRoute />}>
          <Route path="/" element={<ETechLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

      
        <Route element={<PrivateRoute />}>
          <Route path="/app" element={<Layout />}>
            <Route index element={<ReviewsCards />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<DynamicPage />} />
            <Route path="roadmap" element={<RoadmapCourseCard />} />
            <Route path="about" element={<AboutSection />} />
            <Route path="enrolledcourses" element={<EnrolledCourses />} />
            <Route path="me" element={<ProfileComponent />} />
            <Route path="me/coursescompleted" element={<CoursesCompleted />} />
            <Route path="me/account-settings" element={<AccountSettings />} />
          </Route>
        </Route>

      </Routes>
      <ToastContainer />
    </AppInitializer>
  );
}

export default App;
