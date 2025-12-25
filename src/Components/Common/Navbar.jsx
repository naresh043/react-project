import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addAuth } from "../../Redux/features/authSlice";
import { addUser } from "../../Redux/features/userSlice";
import axiosInstance from "../../config/axiosConfig";

import "../../Styles/Common-css/Navbar.css";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const menuRef = useRef();
  const barsRef = useRef();

  const location = useLocation();

  const dispatch = useDispatch();
  const { isAuth, user } = useAuth();
  console.log(
    { isAuth },
    "helooooooooooooooooooooooooooooooooooooooooooooooooooo"
  );

  console.log(user);

  const handleHamburger = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };
  const handleLogOut = async () => {
    console.log("LOG OUT");
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    await axiosInstance.post(`/api/users/logout`, {});
    dispatch(addAuth(false));
    dispatch(addUser(null));
    // Show toast after logout
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAccountMouseEnter = () => {
    setIsOpen(true);
  };

  const handleAccountMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        barsRef.current &&
        !barsRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header className="navheader">
      <nav className="NavBar">
        <div className="navUpperPart">
          <Link to="/" className="logoContainer">
            <h1 className="logo">
              <span className="logoLeft">E-</span>
              <span className="logoRight">Tech</span>
            </h1>
          </Link>
          <ul
            ref={menuRef}
            className={`linksContainer ${
              menuOpen ? "linksContaineractive" : ""
            }`}
          >
            {isAuth && (
              <>
                <li>
                  <NavLink
                    to="/app"
                    end
                    className={({ isActive }) =>
                      isActive ? "active link" : "link"
                    }
                    onClick={handleHamburger}
                  >
                    <span>
                      <i className="fa-solid fa-house navLinkIcon"></i>Home
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/courses"
                    className={({ isActive }) =>
                      isActive ? "active link" : "link"
                    }
                    onClick={handleHamburger}
                  >
                    <span>
                      <i className="fa-solid fa-book-open  navLinkIcon"></i>
                      Courses
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/roadmap"
                    className={({ isActive }) =>
                      isActive ? "active link" : "link"
                    }
                    onClick={handleHamburger}
                  >
                    <span>
                      <i className="fa-solid fa-route navLinkIcon"></i>
                      Roadmap
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/about"
                    className={({ isActive }) =>
                      isActive ? "active link" : "link"
                    }
                    onClick={handleHamburger}
                  >
                    <span>
                      <i className="fa-solid fa-address-card"></i> About
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/enrolledcourses"
                    className={({ isActive }) =>
                      isActive ? "active link" : "link"
                    }
                    onClick={handleHamburger}
                  >
                    <span>
                      <i className="fa-solid fa-graduation-cap"></i> Enrolled
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            <li
              className="Account-cont"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="Account">
                <img
                  src={user?.avatar|| "https://t3.ftcdn.net/jpg/07/24/59/76/240_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                  alt="Profile"
                  className="profile-image"
                />
                <i className="fa-solid fa-caret-down"></i>
              </div>

              {isOpen && (
                <ul className="account-dropdown">
                  {isAuth ? (
                    <>
                      <li>
                        <Link
                          to="/app/me"
                          className="link"
                          onClick={handleHamburger}
                        >
                          <i className="fa-solid fa-user"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/app/me/account-settings"
                          className="link"
                          onClick={handleHamburger}
                        >
                          <i className="fa-solid fa-cog"></i> Account Settings
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogOut} className="logoutbtn">
                          <i
                            className="fa-solid fa-sign-out-alt"
                            id="logoutIcon"
                          ></i>
                          Logout
                        </button>
                      </li>
                    </>
                  ) : location?.pathname !== "/Login" ? (
                    <li>
                      <Link to="/Login" onClick={handleHamburger}>
                        <i className="fa-solid fa-sign-in-alt"></i> Login
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/Signup" onClick={handleHamburger}>
                        <i className="fa-solid fa-user-plus"></i> Signup
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>
          <div className="bars" onClick={handleHamburger} ref={barsRef}>
            <button>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
