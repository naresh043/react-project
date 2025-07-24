import { format } from "date-fns";
import Rating from "react-rating";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Enrolled-css/enrolled.css"; // Import the CSS file

function EnrolledCourses() {
  const [enrolledData, setEnrollData] = useState([]);
  const [updatingProgressId, setUpdatingProgressId] = useState(null);
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
      // toast.success("Course fectched successful!", {
      //   position: "top-right",
      //   autoClose: 1000,
      // });
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getEnrollmets();
  }, [updatingProgressId]);

  console.log(enrolledData)
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      enrolled: "status-enrolled",
      "in-progress": "status-progress",
      completed: "status-completed",
      paused: "status-paused",
    };
    return statusClasses[status] || "status-default";
  };
  const getProgressText = (progress, courseName) => {
    if (progress === 0) return "Not started yet";
    if (progress > 0 && progress < 25) return "Just getting started";
    if (progress >= 25 && progress < 50) return "Making good progress";
    if (progress >= 50 && progress < 75) return "Halfway there!";
    if (progress >= 75 && progress < 100) return "Almost complete";
    if (progress === 100) return "Course completed!";

    return ""; // fallback
  };

  const handleProgressUpdate = async (courseId, progressValue) => {
    try {
      setUpdatingProgressId(courseId);

      const response = await axiosInstance.patch(
        `/api/enrollments/courses/${courseId}/progress`,
        { progress: Number(progressValue) }
      );

      console.log(response);
      const updatedEnrollment = response?.data?.data;

      // ✅ Show toast only when progress hits 100%
      if (Number(progressValue) === 100) {
        toast.success(
          `🎉 You've successfully completed ${updatedEnrollment.course.courseName}!`,
          {
            autoClose: 1000,
          }
        );
      }

      // ✅ Update state with the new enrollment object
      setEnrollData((prevData) =>
        prevData.map((item) =>
          item.course._id === courseId ? updatedEnrollment : item
        )
      );
    } catch (error) {
      console.error("Failed to update progress:", error);
      toast.error("Failed to update progress. Please try again.");
    } finally {
      setUpdatingProgressId(null);
    }
  };

  return (
    <div className="enrolled-courses-container">
      <div className="header">
        <h2 className="page-title">My Enrolled Courses</h2>
        <p className="page-subtitle">Track your learning progress</p>
      </div>
      <hr />
      <div className="courses-grid">
        {enrolledData.map((enrollment) => (
          <div key={enrollment._id} className="course-card">
            <div className="course-image-container">
              <img
                src={enrollment.course.courseLogo}
                alt={enrollment.course.courseName}
                className="course-image"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD48L3N2Zz4=";
                }}
              />
              <div
                className={`status-badge ${getStatusBadge(enrollment.status)}`}
              >
                {enrollment.status.charAt(0).toUpperCase() +
                  enrollment.status.slice(1)}
              </div>
            </div>

            <div className="course-content">
              <div className="course-header">
                <h3 className="course-title">{enrollment.course.courseName}</h3>
                <div className="course-category">
                  {enrollment.course.category}
                </div>
              </div>

              <div className="course-info">
                <div className="rating-section">
                  <div className="stars">
                    <Rating
                      readonly
                      initialRating={enrollment.course.rating}
                      emptySymbol={<span className="star empty">☆</span>}
                      fullSymbol={<span className="star filled">★</span>}
                      fractions={2}
                    />
                  </div>
                  <span className="rating-value">
                    ({enrollment.course.rating})
                  </span>
                </div>

                <div className="course-details">
                  <div className="detail-item">
                    <span className="detail-label">
                      👨‍🏫 {enrollment.course.instructor}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      ⏱️ {enrollment.course.duration}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label price">
                      💰 {enrollment.course.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percentage">
                    {enrollment.progress}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${enrollment.progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  {getProgressText(enrollment.progress)}
                </p>
              </div>

              <div className="progress-control">
                <select
                  value={enrollment.progress}
                  onChange={(e) => {
                    handleProgressUpdate(
                      enrollment?.course?._id,
                      e.target.value
                    );
                  }}
                  disabled={updatingProgressId === enrollment.course._id}
                  className="progress-dropdown"
                >
                  {[0, 10, 25, 50, 75, 100].map((val) => (
                    <option key={val} value={val}>
                      Set to {val}%
                    </option>
                  ))}
                </select>
              </div>

              <div className="dates-info">
                <div className="date-item">
                  <span className="date-text">
                    Started: {formatDate(enrollment.startedAt)}
                  </span>
                </div>
                <div className="date-item">
                  <span className="date-text">
                    Updated: {formatDate(enrollment.updatedAt)}
                  </span>
                </div>
              </div>

              <div className="course-actions">
                <a href={enrollment?.course?.courseLink} target="blank" className="btn-primary" >Continue Learning</a>
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
