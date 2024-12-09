import React, { useState ,useEffect} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../Styles/Common-css/Navbar.css"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// toasters 
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; 
import { ActionisUserLogin,ActionisUserLogout,ActionuserDetils } from "../../Redux/features/searchSlice";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
 const location = useLocation()
 const [isAuthenticated, setIsAuthenticated] = useState(false);

   
   const isUserLogin =useSelector((state)=>state.search?.user?.login)
   const isUserLogout =useSelector((state)=>state.search?.user?.logout)

   useEffect(() => {
    const userCookie = Cookies.get("AuthToken");
    setIsAuthenticated(userCookie === "true");
  }, [isUserLogin,isUserLogout]);
  //  assing dispatch to dispatch variable 
  const dispatch = useDispatch();

  const handleHamburger = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    
  };
  const handleHamburgerLogOut = () => {
    console.log("LOG OUT")
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    // Show toast after logout
  
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // onClose:dispatch(isUserLogout(true))
    });
    Cookies.remove("AuthToken")
    // dispatch(isUserLogin(true));
    // dispatch(isUserLogout(false));
    dispatch(ActionisUserLogin(true));
    dispatch(ActionisUserLogout(null));
    dispatch(ActionuserDetils ([]));
  };

  const handleAccountMouseEnter = () => {
    setIsOpen(true);
  };

  const handleAccountMouseLeave = () => {
    setIsOpen(false);
  };

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
            {isAuthenticated && (
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
                <i class="fa-solid fa-address-card"></i> About
                  </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/enrollecourses"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
                onClick={handleHamburger}
              >
                <span>
                <i class="fa-solid fa-graduation-cap"></i> Enrolled
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
                { isAuthenticated ?<li>
                    <Link to="/Login" >
                    <button onClick={handleHamburgerLogOut} className="logoutbtn">
                      Logout
                    </button>
                    </Link>
                  </li>: location?.pathname !=="/Login" ? <li>
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
