import React from "react";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
