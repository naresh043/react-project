import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Courses/courses.css";
import Loading from "../Common/loading";
import { useDispatch, useSelector } from "react-redux";
// this is the import the action from store
import { ActionuserDetils } from "../../Redux/features/searchSlice";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const DynamicPage = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userData = useSelector((state) => state?.search?.userDetails) || {};
    const dispatch = useDispatch();
console.log(userData)
    useEffect(() => {
        const fetchedData = async () => {
            try {
                const { data } = await axios.get(`https://giant-ambitious-danger.glitch.me/coursesdata/${id}`);
                setData(data);
                setLoading(false);
            } catch (err) {
                setError("Error occurred while fetching data.");
                setLoading(false);
                console.log("Error occurred:", err);
            }
        };

        if (id) {
            fetchedData();
        }
    }, [id]);

    if (loading) {
        return <div><Loading /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const backButton = () => {
        navigate("/courses");
    };

    const handleAddCourse = async () => {
        try {
            // Ensure `enrolledCourses` is an array
            const enrolledCourses = Array.isArray(userData?.enrolledCourses)
                ? userData.enrolledCourses
                : [];

            // Ensure `data` (course details) is valid
            if (!data) {
                throw new Error("Course data is missing.");
            }

            // Check if the course is already enrolled
        const isAlreadyEnrolled = enrolledCourses.some(
            (course) => course.id === data.id
        );

        if (isAlreadyEnrolled) {
            toast.warning("You are already enrolled in this course.", {
                position:"top-right",
                autoClose: 2000,
            });
            return;
        }

            // Create the updated user object
            const updatedUser = {
                id: userData?.id,
                name: userData?.name,
                email: userData?.email,
                password: userData?.password,
                enrolledCourses: [...enrolledCourses, data], // Add the new course
            };

            // Send the updated user data to the server
            const response = await axios.put(
                `https://giant-ambitious-danger.glitch.me/credentials/${userData.id}`,
                updatedUser,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status !== 200) {
                throw new Error("Failed to update user data.");
            }

            // Update Redux state
            dispatch(userDetils(updatedUser));
            toast.success("Course added successfully!", {
                position:"top-right",
                autoClose: 1000,
            });
        } catch (error) {
            console.error("Error adding course:", error.message);
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            {data && (
                <div className="selected-course-container">
                    <div className="course-header">
                        <img
                            src={data.courseLogo}
                            alt={data.courseName}
                            className="course-logo"
                        />
                        <div className="course-header-text">
                            <h2 className="course-title">{data.courseName}</h2>
                            <p className="course-category">
                                <b>Category:</b> {data.category}
                            </p>
                            <p className="course-level">
                                <b>Level:</b> {data.courseLevel || "N/A"}
                            </p>
                            <p className="course-instructor">
                                <b>Instructor:</b> {data.instructor || "N/A"}
                            </p>
                            <p className="course-rating">
                                <b>Rating:</b> ⭐ {data.rating} ({data.reviewsCount} reviews)
                            </p>
                        </div>
                    </div>

                    <div className="course-details">
                        <h3>About this Course</h3>
                        <p className="course-description">
                            {data.description || "No description available."}
                        </p>
                        <p>
                            <b>Duration:</b> {data.duration}
                        </p>
                        <p>
                            <b>Price:</b> {data.price || "Free"}
                        </p>
                        <p>
                            <b>Completion Certificate:</b> {data.completionCertificate ? "Yes" : "No"}
                        </p>

                        <h3>Key Takeaways</h3>
                        <ul className="key-takeaways">
                            {data.keyTakeaways.map((takeaway, index) => (
                                <li key={index}>{takeaway}</li>
                            ))}
                        </ul>

                        <h3>Pre-requirements</h3>
                        <ul className="pre-requirements">
                            {data.preRequirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>

                        <button onClick={backButton} className="back-btn">
                            <i className="fa-solid fa-arrow-left"></i>
                            Back to Courses
                        </button>
                        <button
                            type="button"
                            // href={data.courseLink}
                            // target="_blank"
                            className="course-link"
                            onClick={async () => {
                                handleAddCourse();
                                setTimeout(() => {
                                    
                                    window.open(data.courseLink, "_blank"); 
                                }, 1900);
                            }}
                        >
                            Enroll Now
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </>
    );
};

export default DynamicPage;
