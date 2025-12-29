import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import LoadingSpinneer from "../Common/LodingSpinneer";
import "../../Styles/Courses/dynamicPage.css";
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
  BarChart2,
  Play,
  Users,
  Target,
} from "react-feather";
import { addExistedEnrolls } from "../../Redux/features/enrolledCoursesSlice";
import { getProfile } from "../../utils/getUser";
import { addUser } from "../../Redux/features/userSlice";
import PaymentSuccessPopup from "../payment/PaymentSuccess";
import { downloadReceipt } from "../../utils/downloadReceipt";

const DynamicPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [receipt, setReceipt] = useState(null);

  console.log(receipt, "recipttttttttttttttttttt");

  const userData = useSelector((state) => state?.user) || {};
  const enrollData = useSelector((state) => state?.enrolledCourses) || [];
  const dispatch = useDispatch();

  const getEnrolledCourses = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/enrollments/me/enrolled-courses"
      );
      const enrolled = response?.data?.data || [];
      // console.log(enrolled, "enroll data", courseId, "courseId");

      dispatch(addExistedEnrolls(enrolled));

      const alreadyEnrolled = enrolled.some(
        (item) => item?.course?._id === courseId
      );
      setIsEnrolled(alreadyEnrolled);
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setCheckingEnrollment(false);
    }
  };

  // const isEnrolled = enrollData?.some?.((course) => course?._id === data?._id);
  // console.log(enrollData, "120310");
  // console.log(isEnrolled);

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
  useEffect(() => {
    // if (courseId) {
    //   fetchedData();
    // }

    // if (!enrollData || Object.keys(enrollData).length === 0) {
    //   getEnrolledCourses();
    // }
    if (courseId) {
      fetchedData();
      getEnrolledCourses();
    }
  }, [courseId]);

  const handleBack = () => navigate("/courses");

  const handlePayment = async () => {
    console.log("raz btn clicked");
    try {
      const orderRes = await axiosInstance.post("/api/payment/create-order", {
        amount: data.price, // dynamic price
        courseId: data._id,
      });

      const options = {
        key: "rzp_test_RvsMPlknvil3gO", // test key only
        amount: orderRes.data.amount,
        currency: "INR",
        name: "E-Learning App",
        description: data.courseName,
        order_id: orderRes.data.id,

        handler: async function (response) {
          const verifyRes = await axiosInstance.post(
            "/api/payment/verify-payment",
            {
              ...response,
              courseId: data._id,
            }
          );
          if (verifyRes.data.success) {
            setIsEnrolled(true);
            await getEnrolledCourses();

            const userData = await getProfile();
            dispatch(addUser(userData));
            setReceipt(verifyRes.data.receipt);
            setShowPopup(true);
          }
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Try again.");
    }
  };
  const handleEnroll = async () => {
    try {
      if (isEnrolled) {
        toast.warning("You are already enrolled in this course.");
        return;
      }

      const response = await axiosInstance.post(
        `/api/enrollments/courses/${data._id}/enroll`
      );

      if (response.status !== 200)
        throw new Error("Failed to enroll in course.");

      toast.success("Enrolled successfully!", {
        autoClose: 1500,
      });

      dispatch(addExistedEnrolls([...enrollData, data]));
      await getEnrolledCourses(); // refresh Redux + local state
      setIsEnrolled(true); // update local status
      const userData = await getProfile();
      dispatch(addUser(userData));
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.warning("You are already enrolled in this course.", {
          autoClose: 2000,
        });
        setIsEnrolled(true);
      } else {
        toast.error("Enrollment failed. Try again.", {
          autoClose: 2000,
        });
      }
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <LoadingSpinneer />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div className="error-message">Course not found</div>;

  return (
    <main className="selected-course-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <img src={data.courseLogo} alt="" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="breadcrumb">
            <span onClick={handleBack} className="breadcrumb-link">
              Courses
            </span>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">{data.courseName}</span>
          </div>

          <h1 className="hero-title">{data.courseName}</h1>

          <div className="hero-meta">
            <div className="meta-item">
              <Tag size={16} />
              <span>{data.category}</span>
            </div>
            <div className="meta-item">
              <User size={16} />
              <span>{data.instructor || "Expert Instructor"}</span>
            </div>
            <div className="meta-item rating-meta">
              <Star size={16} className="star-icon" />
              <span className="rating-value">{data.rating}</span>
              <span className="rating-count">
                ({data.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Course Info Cards */}
        <div className="info-cards-grid">
          <div className="info-card">
            <div className="info-card-icon duration">
              <Clock size={24} />
            </div>
            <div className="info-card-content">
              <h3>Duration</h3>
              <p>{data.duration}</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-icon price">
              <DollarSign size={24} />
            </div>
            <div className="info-card-content">
              <h3>Price</h3>
              <p>{data.price || "Free"}</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-icon level">
              <BarChart2 size={24} />
            </div>
            <div className="info-card-content">
              <h3>Level</h3>
              <p>{data.courseLevel || "All Levels"}</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-icon certificate">
              <Award size={24} />
            </div>
            <div className="info-card-content">
              <h3>Certificate</h3>
              <p>{data.completionCertificate ? "Included" : "Not Available"}</p>
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* Left Column */}
          <div className="content-left">
            {/* Course Description */}
            <section className="content-section">
              <div className="section-header">
                <div className="section-icon-wrapper">
                  <Info className="section-icon" />
                </div>
                <h2>About this Course</h2>
              </div>
              <div className="section-content">
                <p className="course-description">
                  {data.description ||
                    "Discover the fundamentals and advanced concepts in this comprehensive course designed to enhance your skills and knowledge."}
                </p>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="content-section">
              <div className="section-header">
                <div className="section-icon-wrapper takeaways">
                  <Target className="section-icon" />
                </div>
                <h2>What You'll Learn</h2>
              </div>
              <div className="section-content">
                <div className="takeaways-grid">
                  {data.keyTakeaways?.map((takeaway, index) => (
                    <div key={index} className="takeaway-item">
                      <CheckCircle className="takeaway-icon" size={20} />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            <section className="content-section">
              <div className="section-header">
                <div className="section-icon-wrapper requirements">
                  <BookOpen className="section-icon" />
                </div>
                <h2>Prerequisites</h2>
              </div>
              <div className="section-content">
                <div className="requirements-list">
                  {data.preRequirements?.map((req, index) => (
                    <div key={index} className="requirement-item">
                      <div className="requirement-bullet"></div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Enrollment Card */}
          <div className="content-right">
            <div className="enrollment-card">
              <div className="course-image-container">
                <img
                  src={data.courseLogo}
                  alt={`${data.courseName} course`}
                  className="course-preview-image"
                />
                <div className="play-overlay">
                  <Play className="play-icon" />
                </div>
              </div>

              <div className="enrollment-content">
                <div className="price-section">
                  <span className="current-price">{data.price || "Free"}</span>
                  {data.originalPrice && (
                    <span className="original-price">
                      ${data.originalPrice}
                    </span>
                  )}
                </div>

                <div className="enrollment-features">
                  <div className="feature-item">
                    <Clock size={16} />
                    <span>{data.duration} of content</span>
                  </div>
                  <div className="feature-item">
                    <Users size={16} />
                    <span>Lifetime access</span>
                  </div>
                  {data.completionCertificate && (
                    <div className="feature-item">
                      <Award size={16} />
                      <span>Certificate included</span>
                    </div>
                  )}
                </div>

                {!checkingEnrollment && (
                  <button
                    onClick={() => {
                      if (data.price && data.price > 0) {
                        handlePayment(); // 💳 paid course
                      } else {
                        handleEnroll(); // 🆓 free course
                      }
                    }}
                    className={`enroll-button ${isEnrolled ? "enrolled" : ""}`}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle size={20} />
                        Already Enrolled
                      </>
                    ) : data.price && data.price > 0 ? (
                      <>
                        Pay ₹{data.price} & Enroll
                        <ArrowRight size={20} />
                      </>
                    ) : (
                      <>
                        Enroll for Free
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                )}

                <button onClick={handleBack} className="back-button">
                  <ArrowLeft size={18} />
                  Back to Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentSuccessPopup
        open={showPopup}
        receipt={receipt}
        onDashboard={() => navigate("/app/enrolledcourses")}
        onDownload={() => downloadReceipt(receipt)}
      />
    </main>
  );
};

export default DynamicPage;
