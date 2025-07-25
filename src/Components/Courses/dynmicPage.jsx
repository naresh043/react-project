import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import "../../Styles/Courses/dynamicPage.css";
import Loading from "../Common/loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Award,
  Clock,
  DollarSign,
  BookOpen,
  CheckCircle,
  User,
  Tag,
  Info,
  Book,
  List,
  BarChart2,
} from "react-feather";
import Rating from "react-rating";
import { addExistedEnrolls } from "../../Redux/features/enrolledCoursesSlice";

const DynamicPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const [enrollData, setEnrollData] = useState(null);
  const userData = useSelector((state) => state?.user) || {};
  const enrollData = useSelector((state) => state?.enrolledCourses) || {};
  const dispatch = useDispatch();
  console.log(enrollData, "12345658");
  console.log(data?._id, "data");

  const getEnrolledCourses = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/enrollments/me/enrolled-courses"
      );
      dispatch(addExistedEnrolls(response?.data?.data));
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axiosInstance.get(`/api/courses/${courseId}`);
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Error occurred while fetching data.");
        setLoading(false);
        console.error("Error occurred:", err);
      }
    };

    if (courseId) {
      fetchedData();
    }

    if (!enrollData || Object.keys(enrollData).length === 0) {
      getEnrolledCourses();
    }
  }, [courseId, dispatch]);

  const handleBack = () => navigate("/courses");
const handleEnroll = async () => {
  try {
    // Prevent duplicate enrollment
    if (enrollData?.some((course) => course._id === data._id)) {
      toast.warning("You are already enrolled in this course.");
      return;
    }

    const response = await axiosInstance.post(
      `/api/enrollments/courses/${data._id}/enroll`
    );

    if (response.status !== 200)
      throw new Error("Failed to enroll in course.");

    toast.success("Enrolled successfully!");

    // Optionally update Redux store with new course
    dispatch(addExistedEnrolls([...enrollData, data]));
  } catch (error) {
    if (error?.response?.status === 409) {
      toast.warning("You are already enrolled in this course.");
    } else {
      toast.error("Enrollment failed. Try again.");
    }
    console.error("Enroll Error:", error.message);
  }
};



  if (loading)
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div className="error-message">Course not found</div>;

  return (
    <main className="selected-course-container">
      <article className="course-header">
        <figure className="course-image-container">
          <img
            src={data.courseLogo}
            alt={`${data.courseName} course logo`}
            className="course-logo"
            loading="lazy"
          />
        </figure>

        <div className="course-header-text">
          <h1 className="course-title">{data.courseName}</h1>

          <div className="course-meta">
            <p className="course-category">
              <Tag className="meta-icon" />
              <strong>Category:</strong> {data.category}
            </p>
            <p className="course-level">
              <Book className="meta-icon" />
              <strong>Level:</strong> {data.courseLevel || "N/A"}
            </p>
            <p className="course-instructor">
              <User className="meta-icon" />
              <strong>Instructor:</strong> {data.instructor || "N/A"}
            </p>
            <p className="course-rating">
              <Star className="meta-icon" />
              <strong>Rating:</strong>
              <span className="rating-stars">
                <Rating
                  readonly
                  initialRating={data.rating}
                  emptySymbol={<Star color="#ccc" size={20} />}
                  fullSymbol={<Star color="#f5c518" size={20} />}
                />
              </span>
              ({data.reviewsCount} reviews)
            </p>
          </div>
        </div>
      </article>

      <article className="course-details">
        <section className="course-section">
          <h2>About this Course</h2>
          <p className="course-description">
            {data.description || "No description available."}
          </p>

          <div className="course-info-grid">
            <p>
              <Clock className="info-icon" />
              <strong>Duration:</strong> {data.duration}
            </p>
            <p>
              <DollarSign className="info-icon" />
              <strong>Price:</strong> {data.price || "Free"}
            </p>
            <p>
              <Award className="info-icon" />
              <strong>Certificate:</strong>
              {data.completionCertificate ? " Included" : " Not included"}
            </p>
          </div>
        </section>

        <section className="course-section">
          <h2>
            <CheckCircle className="section-icon" /> Key Takeaways
          </h2>
          <ul className="key-takeaways">
            {data.keyTakeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </section>

        <section className="course-section">
          <h2>
            <Book className="section-icon" /> Pre-requirements
          </h2>
          <ul className="pre-requirements">
            {data.preRequirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </section>

        <div className="course-actions">
          <button onClick={handleBack} className="back-btn">
            <ArrowLeft className="action-icon" />
            Back to Courses
          </button>
          <button
            onClick={handleEnroll}
            className="course-link"
            aria-label={`Enroll in ${data.courseName}`}
          >
            Enroll Now
            <ArrowRight className="action-icon" />
          </button>
        </div>
      </article>
    </main>
  );
};

export default DynamicPage;
