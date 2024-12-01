import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../Redux/features/searchSlice";
import Loading from "../Common/loading";
import "../../Styles/Courses/courses.css";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";

function Courses() {
  const [reviews, setReviews] = useState([]); // Store fetched reviews
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors
  const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query); // Get the search query from the store

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://giant-ambitious-danger.glitch.me/coursesdata"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter reviews based on the search query
  // Filter reviews based on search query and category
  const filteredReviews = reviews.filter((val) => {
    const matchesSearch = val.courseName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || val.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render the detailed view of a course
  // Inside the if (selectedCourse) block
  // if (selectedCourse) {
  //     return (
  //       <>
  //       <Navbar/>
  //       <div className="selected-course-container">
  //         <div className="course-header">
  //           {console.log(selectedCourse)}
  //           <img
  //             src={selectedCourse.courseLogo}
  //             alt={selectedCourse.courseName}
  //             className="course-logo"
  //           />
  //           <div className="course-header-text">
  //             <h2 className="course-title">{selectedCourse.courseName}</h2>
  //             <p className="course-category">
  //               <b>Category:</b> {selectedCourse.category}
  //             </p>
  //             <p className="course-level">
  //               <b>Level:</b> {selectedCourse.courseLevel || "N/A"}
  //             </p>
  //             <p className="course-instructor">
  //               <b>Instructor:</b> {selectedCourse.instructor || "N/A"}
  //             </p>
  //             <p className="course-rating">
  //               <b>Rating:</b> ⭐ {selectedCourse.rating} ({selectedCourse.reviewsCount} reviews)
  //             </p>
  //           </div>
  //         </div>

  //         <div className="course-details">
  //           <h3>About this Course</h3>
  //           <p className="course-description">
  //             {selectedCourse.description || "No description available."}
  //           </p>
  //           <p>
  //             <b>Duration:</b> {selectedCourse.duration}
  //           </p>
  //           <p>
  //             <b>Price:</b> {selectedCourse.price || "Free"}
  //           </p>
  //           <p>
  //             <b>Completion Certificate:</b>{" "}
  //             {selectedCourse.completionCertificate ? "Yes" : "No"}
  //           </p>

  //           <h3>Key Takeaways</h3>
  //           <ul className="key-takeaways">
  //             {selectedCourse.keyTakeaways.map((takeaway, index) => (
  //               <li key={index}>{takeaway}</li>
  //             ))}
  //           </ul>

  //           <h3>Pre-requirements</h3>
  //           <ul className="pre-requirements">
  //             {selectedCourse.preRequirements.map((req, index) => (
  //               <li key={index}>{req}</li>
  //             ))}
  //           </ul>

  //           <button onClick={() => setSelectedCourse(null)} className="back-btn">
  //           <i class="fa-solid fa-arrow-left"></i>
  //             Back to Courses
  //           </button>
  //           <a
  //             href={selectedCourse.courseLink}
  //             target="_self"
  //             rel="noopener noreferrer"
  //             className="course-link"
  //           >
  //             Enroll Now
  //             <i className="fas fa-arrow-right"></i>
  //           </a>
  //         </div>
  //       </div>
  //       <Footer/>
  //       </>
  //     );
  //   }

  return (
    <>
      {/* <Navbar/> */}

      {!loading && (
        <>
          <div className="Course_container">
            <div className="Courses_header">
              <h2>Explore Our Courses</h2>
              <div className="filter_container">
                <select
                  className="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Programming">Programming</option>
                  <option value="Database">Database</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Version Control">Version Control</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </select>
                <div className="search_container">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  />
                  <span className="search_icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((val, ind) => (
                  <div key={ind} className="Course_card">
                    <div className="img_div">
                      <img
                        src={val.courseLogo}
                        alt={val.className}
                        className="card-image"
                      />
                    </div>
                    <div className="card-content">
                      <h3>{val.courseName}</h3>
                      <hr />
                      <p>
                        <b>Category: </b>
                        {val.category}
                      </p>
                      <p className="duration">
                        <i className="fa-regular fa-clock"></i>{" "}
                        <b>Duration: </b>
                        {val.duration}
                      </p>
                      <Link to={`/courses/${ind+1}`}>
                        <button
                          className="overview-btn"
                          onClick={() => {
                            setSelectedCourse(val)}}
                        >
                          Course Overview <i className="fas fa-arrow-right"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-courses-container">
                  <img
                    src="https://res.cloudinary.com/dv5tozhs3/image/upload/v1732542334/_889df780-3e78-46b2-8665-f26fcd6518f1_nu8n1t.jpg"
                    alt="No Courses Found"
                    className="no-courses-message"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Courses;
