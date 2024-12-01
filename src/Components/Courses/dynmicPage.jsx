import { useLocation, useParams } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Courses/courses.css";
import Loading from "../Common/loading";

const DynamicPage = () => {
    let { id } = useParams(); 
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        const fetchedData = async () => {
            try {
                let { data } = await axios.get(`https://giant-ambitious-danger.glitch.me/coursesdata/${id}`);
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
        return <div><Loading/></div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

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

                        <button onClick={() => setData(null)} className="back-btn">
                            <i className="fa-solid fa-arrow-left"></i>
                            Back to Courses
                        </button>
                        <a
                            href={data.courseLink}
                            target="_self"
                            rel="noopener noreferrer"
                            className="course-link"
                        >
                            Enroll Now
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </>
    );
};

export default DynamicPage;
