import { lazy } from "react";

// Lazy load pages/components
const LogIn = lazy(() => import("./Components/Common/Login"));
const Signup = lazy(() => import("./Components/Common/SiginUp"));
const ReviewsCards = lazy(() => import("./Components/Home/reviews-cards"));
const Courses = lazy(() => import("./Components/Courses/courses"));
const RoadmapCourseCard = lazy(() => import("./Components/Roadmaps/roadmap_card"));
const AboutSection = lazy(() => import("./Components/About/about"));
const EnrolledCourses = lazy(() => import("./Components/EnrolledCourses/enrolled"));
const DynamicPage = lazy(() => import("./Components/Courses/dynmicPage"));

// Export components, not JSX elements — better flexibility and correctness
export const routes = [
  { path: "/", Component: ReviewsCards, isPrivate: true },
  { path: "/courses", Component: Courses, isPrivate: true },
  { path: "/roadmap", Component: RoadmapCourseCard, isPrivate: true },
  { path: "/about", Component: AboutSection, isPrivate: true },
  { path: "/enrolled-courses", Component: EnrolledCourses, isPrivate: true },
  { path: "/courses/:id", Component: DynamicPage, isPrivate: true },

  // Public Routes
  { path: "/login", Component: LogIn, isPrivate: false },
  { path: "/signup", Component: Signup, isPrivate: false },
];
