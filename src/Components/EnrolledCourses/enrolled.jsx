import axios from "axios"; // Import axios
import "../../Styles/Enrolled-css/enrolled.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
// this is the import the action from store
import { ActionuserDetils  } from "../../Redux/features/searchSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnrolledCourses() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.search?.userDetails) || {};

  let deleteCourse = async (id) => {
    const latestCourses = userData.enrolledCourses.filter((val) => {
      return val.id !== id;
    });
    const updatedUser = {
      id: userData?.id,
      name: userData?.name,
      email: userData?.email,
      password: userData?.password,
      enrolledCourses: latestCourses, // Add the new course
    };

    try {
      // API call to update the user data using axios
      const response = await axios.put(
        `https://giant-ambitious-danger.glitch.me/credentials/${userData.id}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update user data.");
      }

      // Dispatch the updated user details to Redux
      dispatch(ActionuserDetils (updatedUser));
      dispatch(ActionuserDetils (updatedUser));
      toast.success("Course delete successfully!", {
          position:"top-right",
          autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("An error occurred while updating the user. Please try again.");
    }
  };

  const enrolledCoursesData = useSelector(
    (state) => state?.search?.userDetails?.enrolledCourses
  );

  // Map over the enrolledCoursesData and store the result in a variable
  const courseCards = enrolledCoursesData?.map((course) => (
    <div className="course-card" key={course.id}>
      {/* Left Section */}
      <div className="course-card-left">
        <h3>{course.courseName}</h3>
        <p>COURSE</p>
        <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
          View all chapters
        </a>
      </div>

      {/* Right Section */}
      <div className="course-card-right">
        <h4>Chapter {course.id || "1"}</h4>
        <p>
          {Array.isArray(course.keyTakeaways) && course.keyTakeaways[0]
            ? course.keyTakeaways[0]
            : "Callbacks & Closures"}
        </p>
        <div className="progress-container">
          <div className="progress-bar">
            <span
              style={{
                width: `${(course.challengesCompleted / course.totalChallenges) * 100}%`,
              }}
            ></span>
          </div>
          <p className="progress-text">
            {course.challengesCompleted}/{course.totalChallenges} Challenges
          </p>
        </div>
        <div className="btn-div-enrolled">
          <button className="continue-button">Continue</button>
          <button
            className="delete-button"
            onClick={() => {
              deleteCourse(course.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <h2 className="enrolled-name">Enrolled Courses</h2>
      <hr />
      {courseCards?.length > 0 ? (
        <div className="courses-container">{courseCards}</div>
      ) : (
        <div className="no-enrolled-container">
          <img
            src="https://res.cloudinary.com/dv5tozhs3/image/upload/v1733423220/_f03aa6dd-59c0-43bb-9e07-f2b4f5e0a9fa_jy0irl.jpg"
            alt="No Courses Found"
            className="no-enrolled-message"
          />
        </div>
      )}
    </>
  );
}

export default EnrolledCourses;
