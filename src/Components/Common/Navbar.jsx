import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../Styles/Common-css/Navbar.css"
import { useSelector } from "react-redux";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
 const location = useLocation()
  const handleHamburger = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen); // Toggle the menu open state
    
  };

  const handleAccountMouseEnter = () => {
    setIsOpen(true);
  };

  const handleAccountMouseLeave = () => {
    setIsOpen(false);
  };
  // here user login ornot cheak 
  const isUserLogin =useSelector((state)=>state.search?.user?.login)
  console.log(location?.pathname ==="/Login",'is');
 

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
            className={`linksContainer ${
              menuOpen ? "linksContaineractive" : ""
            }`}
          >
            {isUserLogin && (
              <>
              <li>
              <NavLink
                to="/"
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
                to="/courses"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
                onClick={handleHamburger}
              >
                <span> 
                    <i class="fa-solid fa-book-open  navLinkIcon"></i>
                    Courses
                  </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roadmap"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
                onClick={handleHamburger}
              >
              <span>
                    <i class="fa-solid fa-route navLinkIcon" ></i>
                    Roadmap
                  </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
                onClick={handleHamburger}
              >
                <span>
                    <i class="fa-solid fa-hotel navLinkIcon"></i>About
                  </span>
              </NavLink>
            </li>
              </>
            )}
            <li className="Account-cont">
              <div
                className="Account"
                onMouseEnter={handleAccountMouseEnter}
                onMouseLeave={handleAccountMouseLeave}
              >
               <i class="fa-solid fa-user"></i> <i className="fa-solid fa-caret-down"></i>
              </div>
              {isOpen && (
                <ul
                  className="account-dropdown"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}
                >
                 {location?.pathname !=="/Login" ? <li>
                    <Link to="/Login" onClick={handleHamburger}>
                      Login
                    </Link>
                  </li>:
                  <li>
                    <Link to="/Signup" onClick={handleHamburger}>
                      Signup
                    </Link>
                  </li>}
                </ul>
              )}
            </li>
          </ul>
          <div className="bars" onClick={handleHamburger}>
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
