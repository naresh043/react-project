import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Common-css/login.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isUserLogin } from "../../Redux/features/searchSlice";
function LogIn() {
  let [userData, setuserData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate =useNavigate()
  // const location = useLocation()
  const dispatch = useDispatch()

  let localUserData = JSON.parse(localStorage.getItem("userDetails")) || []; // Parse or default to an empty array
  console.log(localUserData, "localstorage");

  let handle_Username = (e) => {
    setuserData((prevData) => ({
      ...prevData,
      userName: e.target.value,
    }));
    console.log(e.target.value);
  };

  let handle_password = (e) => {
    setuserData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
    console.log(e.target.value);
  };

  let togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the showPassword state
  };

  let handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    // Compare user input with stored data
    const isUserValid = localUserData.some(
      (user) =>
        user.name === userData.userName &&
        user.passWord === userData.password
    );

    if (isUserValid) {
      // Display success toast
      toast.success( `Wellcome Back ${userData.userName}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate("/")
      });
      // navigate("/");
      dispatch(isUserLogin(true))
    } else {
      // Display error toast
      toast.error("Invalid username or password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
              placeholder="Username"
              required
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
              onChange={handle_password}
            />
              <i
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} eyeSymbol`}
              onClick={togglePasswordVisibility} // Toggle visibility on click
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
          <p >
            Don't have an Account?{" "}
            <a href="/Signup" className="registernow">
              Register now
            </a>
          </p>
        </form>
      </div>
      {/* Render ToastContainer */}
      <ToastContainer />
    </>
  );
}

export default LogIn;
