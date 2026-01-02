import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { toast } from "react-toastify";
import { addUser } from "../../Redux/features/userSlice";

import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast
import "../../Styles/Common-css/SiginUp.css";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    passWord: "",
    confirmPass: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (values.passWord !== values.confirmPass) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Attempt registration
      const response = await axiosInstance.post("/api/users/register", {
        name: values.name,
        email: values.email,
        password: values.passWord,
      });

      // On successful registration
      if (response.status === 201) {
        dispatch(addUser(response?.data?.data));

        toast.success("Signup successful!", {
          position: "top-right",
          autoClose: 1500,
        });

        navigate("/app");
      }
    } catch (error) {
      // Handle 409 error for existing user
      if (error.response && error.response.status === 409) {
        toast.error("User already exists with this email!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        // Handle all other errors
        toast.error(`Error: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }

    // Clear form fields
    setValues({ name: "", email: "", passWord: "", confirmPass: "" });
  };

  return (
    <>
      <div className="signupContainer">
        <form className="signupForm" onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <div className="signup-input-cont">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Name"
              value={values?.name}
              required
              onChange={(e) => {
                setValues((pre) => {
                  return { ...pre, name: e?.target?.value };
                });
              }}
            />
          </div>
          <div className="signup-input-cont">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email id"
              required
              value={values?.email}
              onChange={(e) => {
                setValues((pre) => {
                  return { ...pre, email: e?.target?.value };
                });
              }}
            />
          </div>
          <div className="signup-input-cont">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={values?.passWord}
              minLength={6}
              required
              onChange={(e) => {
                setValues((pre) => {
                  return { ...pre, passWord: e?.target?.value };
                });
              }}
            />
          </div>
          <div className="signup-input-cont">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={values?.confirmPass}
              onChange={(e) => {
                setValues((pre) => {
                  return { ...pre, confirmPass: e?.target?.value };
                });
              }}
            />
          </div>
          <p>
            Already have an Account?{" "}
            <Link to="/Login" className="loginText">
              Login
            </Link>
          </p>
          <button type="submit" className="signupSumbitBtn">
            Submit
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}
      {/* Required to display toasts */}
    </>
  );
}

export default Signup;
