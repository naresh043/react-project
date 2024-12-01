import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast
import "../../Styles/Common-css/SiginUp.css";
import Navbar from "./Navbar";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    passWord: "",
    confirmPass: "",
  });
  // const [matchPass,setmatchPass]=useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (values.passWord !== values.confirmPass) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Stop further execution if passwords don't match
    }

    let previousDetails = localStorage.getItem("userDetails");

    let val = JSON.parse(previousDetails) || [];
    let arr = [...val, values];

    localStorage.setItem("userDetails", JSON.stringify(arr));

    // Display a success toast
    toast.success("Signup successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
              // onBlur={(e) => {
              //   if (values?.passWord === e.target.value) {
              //     setmatchPass(true)
              //   } else {
              //     toast.error("Passwords do not match!", {
              //       position: "top-right",
              //       autoClose: 3000,
              //       hideProgressBar: false,
              //       closeOnClick: true,
              //       pauseOnHover: true,
              //       draggable: true,
              //       progress: undefined,
              //     })
              //   }
              // }}
            />
          </div>
          <p>
            Already have an Account? <a href="/Login" className="loginText">Login</a>
          </p>
          <button type="submit" className="signupSumbitBtn">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Required to display toasts */}
    </>
  );
}

export default Signup;
