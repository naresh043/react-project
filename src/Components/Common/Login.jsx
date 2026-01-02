import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Common-css/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/features/userSlice";
import { addAuth } from "../../Redux/features/authSlice";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosConfig";
function LogIn() {
  let [userData, setuserData] = useState({
    email: "",
    password: "",
  });//bhanu@example.com,Bhanu@143
  console.log(userData);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Navigated to:", location.pathname);
  }, [location]);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "516062484148-ij9557lvrrgu2b20srjehpf30ivic06v.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("googleLogin"), {
      //div
      theme: "outline",
      size: "large",
      width: 250,
    });
  }, []);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Authenticate only (cookie is set by backend)
      await axiosInstance.post("/api/users/login", userData);

      const res = await axiosInstance.get("/api/auth/me");
      // 3️⃣ Update redux
      dispatch(addAuth(res.data.authenticated));
      dispatch(addUser(res.data.user));

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => navigate("/app"), 1000);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        // ✅ Same message for all invalid credentials (security best practice)
        toast.error("Invalid email or password.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else if (error.response?.status === 429) {
        toast.error("Too many attempts. Please try again later.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const handleGoogleLogin = async (response) => {
    console.log(response);
    try {
      const res = await axiosInstance.post("/api/users/google-login", {
        token: response.credential,
      });
      console.log(res);

      const user = res.data.data;
      dispatch(addUser(user));
      dispatch(addAuth(res.data.authenticated));

      toast.success("login successful");
      navigate("/app");
    } catch (err) {
      toast.error("Google login failed");
    }
  };

 const handleGuestLogin = async () => {
  const guestUser = {
    email: "guest@example.com",
    password: "Guest@143",
  };

  try {
    // 1️⃣ Login
    await axiosInstance.post("/api/users/login", guestUser);

    // 2️⃣ Fetch authenticated user
    const res = await axiosInstance.get("/api/auth/me");

    // 3️⃣ Update redux
    dispatch(addAuth(res.data.authenticated));
    dispatch(addUser(res.data.user));

    // 4️⃣ Success message
    toast.success("Logged in as Guest!", {
      position: "top-right",
      autoClose: 1000,
    });

    // 5️⃣ Navigate safely
    setTimeout(() => navigate("/app"), 1000);

  } catch (error) {
    console.error(error);

    if (error.response?.status === 401) {
      toast.error("Guest account not available.");
    } else {
      toast.error("Guest login failed. Try again.");
    }
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
          <div className="divider">
            <span>OR</span>
          </div>
          <div id="googleLogin" style={{ marginTop: "15px" }}></div>

          <p>
            Don't have an Account?{" "}
            <Link to="/signup" className="registernow">
              Register now
            </Link>
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
