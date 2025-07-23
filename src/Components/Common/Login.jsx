import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Common-css/login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/features/userSlice";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosConfig";
function LogIn({ setAppRunner }) {
  let [userData, setuserData] = useState({
    email: "bhanu@example.com",
    password: "Bhanu@143",
  });
  console.log(userData);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Navigated to:", location.pathname);
  }, [location]);

  let handle_Username = (e) => {
    setuserData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  let handle_password = (e) => {
    setuserData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  let togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  let handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Fetch data from the API using axios
      const response = await axiosInstance.post("/api/users/login",
        userData
      );
      console.log(response?.data?.data);
      const user = response?.data?.data; // Get users from response
      dispatch(addUser(user));

      if (!user) {
        // Error toast for invalid credentials
        toast.error("Invalid username or password.", {
          position: "top-right",
          autoClose: 1000,
        });
        return;
      }
      // Success toast
      toast.success(`Welcome Back ${user.name || "hello"}!`, {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/"), 1000);
      setAppRunner((pre)=>!pre);
    } catch (error) {
      // Error toast for API issues
      toast.error(`Error fetching user data: ${error.message}`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  let handleGuestLogin = async () => {
    const guestUser = {
      email: "guest@example.com",
      password: "Guest@143",
    };

    const response = await axiosInstance.post(
      "/api/users/login",
      guestUser
    );
    const user = response?.data?.data;

    dispatch(addUser(user));
    toast.success("Logged in as Guest!", {
      position: "top-right",
      autoClose: 1000,
      style: {
        backgroundColor: "#021B79",
        color: "white",
      },
      onClose: () => navigate("/"),
    });
  };

  return (
    <>
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="login-Input-container">
            <input
              type="text"
              id="userName"
              placeholder="Username or Email"
              required
              value={userData.email}
              onChange={handle_Username}
            />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="login-Input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="passwordlogin"
              placeholder="Password"
              minLength="6"
              required
              value={userData.password}
              onChange={handle_password}
            />
            <i
              className={`fa-solid ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } eyeSymbol`}
              onClick={togglePasswordVisibility} // Toggle visibility on click
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
          <p>
            Don't have an Account?{" "}
            <a href="/Signup" className="registernow">
              Register now
            </a>
          </p>
          <button type="button" className="GuestBtn" onClick={handleGuestLogin}>
            Guest Mode
          </button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
