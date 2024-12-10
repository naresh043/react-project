import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast
import "../../Styles/Common-css/SiginUp.css";
import { useDispatch } from "react-redux"; // Import useDispatch
// import { userDetils } from "../../Redux/features/searchSlice";
import { ActionisUserLogin,ActionuserDetils } from "../../Redux/features/searchSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios


function Signup() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    passWord: "",
    confirmPass: "",
    enrolledCourses:[]

  });


  const handleSubmit = async  (e) => {
    e.preventDefault();

   
    if (values.passWord !== values.confirmPass) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      // First, check if the email already exists
    const checkResponse = await axios.get(
      `https://giant-ambitious-danger.glitch.me/credentials?email=${values.email}`
    );

    if (checkResponse.data.length > 0) {
      // If the email already exists, show an error toast
      toast.error("User is already exists!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
     // If the email does not exist, proceed with registration
      const response = await axios.post("https://giant-ambitious-danger.glitch.me/credentials", {
        name: values.name,
        email: values.email,
        password: values.passWord,
        enrolledCourses: values?.enrolledCourses
      });

      // If the response is successful
      if (response.status === 201) {
        const responseData = response.data; // Extract the response data
        const userData = {
          name: values.name,
          email: values.email,
          enrolledCourses: values.enrolledCourses,
          password: values.passWord,
          id: responseData.id
        };
        dispatch(ActionisUserLogin(true));
        dispatch(ActionuserDetils(userData));
        toast.success("Signup successful !", {
          position: "top-right",
          autoClose: 2000,
       
        });
        navigate("/");
      } else {
        throw new Error("Failed to send data to the server.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }


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
            Already have an Account? <a href="/Login" className="loginText">Login</a>
          </p>
          <button type="submit" className="signupSumbitBtn">
            Submit
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}{/* Required to display toasts */}
    </>
  );
}

export default Signup;
