import axios from "axios"; // Import axios
import "../../Styles/Enrolled-css/enrolled.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
// this is the import the action from store
// import { ActionuserDetils  } from "../../Redux/features/searchSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";
import { useEffect, useState } from "react";

function EnrolledCourses() {
  const [enrolledData, setEnrollData] = useState([]);
  const dispatch = useDispatch();

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
  };

  const getEnrollmets = async () => {
    try {
      // API call to update the user data using axios
      const response = await axiosInstance(
        `/api/enrollments/me/enrolled-courses`
      );
      console.log(response);
      setEnrollData(response?.data?.data);
      if (response.status !== 200) {
        throw new Error("Failed to get enrolled courses !");
      }
      toast.success("Course fectched successful!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getEnrollmets();
  }, []);

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'enrolled': 'status-enrolled',
      'in-progress': 'status-progress',
      'completed': 'status-completed',
      'paused': 'status-paused'
    };
    return statusClasses[status] || 'status-default';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };


  // Assuming enrollData is the API response array
// const courseCards = enrollData?.map((item) => {
//   const course = item.course; // Extract course object
//   return (
//     <div className="course-card" key={item._id}>
//       {/* Left Section */}
//       <div className="course-card-left">
//         <h3>{course.courseName}</h3>
//         <p>COURSE</p>
//         <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
//           View all chapters
//         </a>
//       </div>

//       {/* Right Section */}
//       <div className="course-card-right">
//         <h4>{course.category || "Web Development"}</h4>
//         <p>
//           {Array.isArray(course.keyTakeaways) && course.keyTakeaways[0]
//             ? course.keyTakeaways[0]
//             : "Start your journey today!"}
//         </p>
//         <div className="progress-container">
//           <div className="progress-bar">
//             <span
//               style={{
//                 width: `${item.progress || 0}%`, // Progress from API
//               }}
//             ></span>
//           </div>
//           <p className="progress-text">{item.progress}% Completed</p>
//         </div>
//         <div className="btn-div-enrolled">
//           <button
//             className="continue-button"
//             onClick={() => window.open(course.courseLink, "_blank")}
//           >
//             Continue
//           </button>
//           <button
//             className="delete-button"
//             onClick={() => deleteCourse(item._id)}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

  // Map over the enrolledCoursesData and store the result in a variable
  // const courseCards = enrollData?.map((course) => (
  //   <div className="course-card" key={course.id}>
  //     {/* Left Section */}
  //     <div className="course-card-left">
  //       <h3>{course.courseName}</h3>
  //       <p>COURSE</p>
  //       <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
  //         View all chapters
  //       </a>
  //     </div>

  //     {/* Right Section */}
  //     <div className="course-card-right">
  //       <h4>Chapter {course.id || "1"}</h4>
  //       <p>
  //         {Array.isArray(course.keyTakeaways) && course.keyTakeaways[0]
  //           ? course.keyTakeaways[0]
  //           : "Callbacks & Closures"}
  //       </p>
  //       <div className="progress-container">
  //         <div className="progress-bar">
  //           <span
  //             style={{
  //               width: `${
  //                 (course.challengesCompleted / course.totalChallenges) * 100
  //               }%`,
  //             }}
  //           ></span>
  //         </div>
  //         <p className="progress-text">
  //           {course.challengesCompleted}/{course.totalChallenges} Challenges
  //         </p>
  //       </div>
  //       <div className="btn-div-enrolled">
  //         <button
  //           className="continue-button"
  //           onClick={async () => {
  //             window.open(course.courseLink, "_blank");
  //           }}
  //         >
  //           Continue
  //         </button>
  //         <button
  //           className="delete-button"
  //           onClick={() => {
  //             deleteCourse(course.id);
  //           }}
  //         >
  //           Delete
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // ));

  // return (
  //   <>
  //     <h2 className="enrolled-name">Enrolled Courses</h2>
  //     <hr />
  //     {courseCards?.length > 0 ? (
  //       <div className="courses-container">{courseCards}</div>
  //     ) : (
  //       <div className="no-enrolled-container">
  //         <img
  //           src="https://res.cloudinary.com/dv5tozhs3/image/upload/v1733423220/_f03aa6dd-59c0-43bb-9e07-f2b4f5e0a9fa_jy0irl.jpg"
  //           alt="No Courses Found"
  //           className="no-enrolled-message"
  //         />
  //       </div>
  //     )}
  //   </>
  // );




  return (
    <div className="enrolled-courses-container">
      <div className="header">
        <h1 className="page-title">My Enrolled Courses</h1>
        <p className="page-subtitle">Track your learning progress</p>
      </div>

      <div className="courses-grid">
        {enrolledData.map((enrollment) => (
          <div key={enrollment._id} className="course-card">
            <div className="course-image-container">
              <img
                src={enrollment.course.courseLogo}
                alt={enrollment.course.courseName}
                className="course-image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
              <div className={`status-badge ${getStatusBadge(enrollment.status)}`}>
                {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
              </div>
            </div>

            <div className="course-content">
              <div className="course-header">
                <h3 className="course-title">{enrollment.course.courseName}</h3>
                <div className="course-category">{enrollment.course.category}</div>
              </div>

              <div className="course-meta">
                <div className="meta-item">
                  <span className="meta-label">Instructor:</span>
                  <span className="meta-value">{enrollment.course.instructor}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">{enrollment.course.duration}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Price:</span>
                  <span className="meta-value price">{enrollment.course.price}</span>
                </div>
              </div>

              <div className="rating-section">
                <div className="stars">
                  {renderStars(enrollment.course.rating)}
                </div>
                <span className="rating-value">({enrollment.course.rating})</span>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percentage">{enrollment.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${enrollment.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="dates-section">
                <div className="date-item">
                  <span className="date-label">Started:</span>
                  <span className="date-value">{formatDate(enrollment.startedAt)}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Last Updated:</span>
                  <span className="date-value">{formatDate(enrollment.updatedAt)}</span>
                </div>
              </div>

              <div className="course-actions">
                <button className="btn-primary">Continue Learning</button>
                <button className="btn-secondary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledCourses;
