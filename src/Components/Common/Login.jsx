import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Common-css/login.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isUserLogin,isUserLogout,userDetils} from "../../Redux/features/searchSlice";
import { useSelector } from "react-redux";
import axios from "axios"; // Import axios

function LogIn() {
  let [userData, setuserData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate =useNavigate()
 
  const dispatch = useDispatch()

  const user_data= useSelector((state)=>state.search.userDetails)

  let handle_Username = (e) => {
    setuserData((prevData) => ({
      ...prevData,
      userEmail: e.target.value,
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
    setShowPassword((prev) => !prev); 
  };

  let handleLogin = async (e) => {
    e.preventDefault(); 


    try {
     // Fetch data from the API using axios
     const response = await axios.get("https://giant-ambitious-danger.glitch.me/credentials");
     const users = response.data; // Get users from response

      // Validate user credentials
      const isUserValid = users.find(
        (user) =>
          user.email === userData.userEmail &&
          user.password === userData.password
      );

      if (isUserValid) {
        dispatch(userDetils(isUserValid));
        // Success toast
        toast.success(`Welcome Back ${isUserValid.name}!`, {
          position: "top-right",
          autoClose: 1000,
          onClose: () => navigate("/"),
        });
        dispatch(isUserLogin(true));
        dispatch(isUserLogout(false));
      } else {
        // Error toast for invalid credentials
        toast.error("Invalid username or password.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Error toast for API issues
      toast.error(`Error fetching user data: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
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
              placeholder="Username or Email"
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
      {/* <ToastContainer /> */}
    </>
  );
}

export default LogIn;
