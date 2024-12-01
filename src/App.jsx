import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from "./Components/Common/Navbar"
import Coursel_home from "./Components/Home/Coursel"
// import './Styles/nav.css'
import Footer from './Components/Common/Footer'
import ReviewsCards from './Components/Home/reviews-cards'

import Courses from './Components/Courses/courses'
import Loading from './Components/Common/loading'

import RoadmapCourseCard from './Components/Roadmaps/roadmap_card'
import AboutSection from './Components/About/about'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DynamicPage from './Components/Courses/dynmicPage'
import LogIn from './Components/Common/Login'
import Signup from './Components/Common/SiginUp'
function App() {
 

  return (
  <>
  {/* <Navbar/> */}
  {/* <Coursel_home/> */}
  {/* <ReviewsCards/> */}
  {/* <Courses/> */}
  {/* <RoadmapCourseCard/> */}
    {/* <AboutSection/> */}
    {/* <LogIn/> */}
    {/* <Signup/> */}
  {/* <Footer/> */}
  {/* <Loading/> */}
  <Navbar/>
  <Routes>
  
    <Route path='/' element={<ReviewsCards/>}/>
    <Route path='/courses' element={<Courses/>}/>
    <Route path='/roadmap' element={<RoadmapCourseCard/>}/>
    <Route path='/about' element={<AboutSection/>}/>
    <Route path='/courses/:id' element={<DynamicPage/>}/>
    <Route path='/Login' element={<LogIn/>}/>
    <Route path='/Signup' element={<Signup/>}/>
     
  </Routes>
  <Footer/>
  </>

  )
}

export default App
