import { useState,useEffect } from "react";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import ReviewsCards from "./Components/Home/reviews-cards";
import Courses from "./Components/Courses/courses";
import RoadmapCourseCard from "./Components/Roadmaps/roadmap_card";
import AboutSection from "./Components/About/about";
import EnrolledCourses from "./Components/EnrolledCourses/enrolled"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DynamicPage from "./Components/Courses/dynmicPage";
import LogIn from "./Components/Common/Login";
import Signup from "./Components/Common/SiginUp";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"; 

// toasters 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const isUserLogin =useSelector((state)=>state.search?.user?.login)
  const isUserLogout =useSelector((state)=>state.search?.user?.logout)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userCookie = Cookies.get("AuthToken");
    setIsAuthenticated(userCookie === "true");
  }, [isUserLogin,isUserLogout]);
  return (
      <>
        <Navbar />
      <Routes>

        {isAuthenticated ? (
          <>
        
            <Route path="/" element={<ReviewsCards />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/roadmap" element={<RoadmapCourseCard />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/enrollecourses" element={<EnrolledCourses />} />
            <Route path="/courses/:id" element={<DynamicPage />} />
            <Route path="/Login" element={<LogIn />} />
            <Route path="/Signup" element={<Signup />} />
          </>
        ) :null }
          {/* alwaus shows  */}
            {/* <Route path="/" element={<LogIn />} /> */}
            <Route path="/Login" element={<LogIn />} />
            <Route path="/Signup" element={<Signup />} />

      </Routes>
      <Footer />
      <ToastContainer/>
    </>
  );
}

export default App;
