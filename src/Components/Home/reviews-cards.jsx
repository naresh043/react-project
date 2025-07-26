import Button from "react-bootstrap/Button";
import axios from "axios";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/Constants";
import "../../Styles/home-css/review-cards.css";
import Card from "react-bootstrap/Card";

// import Loading from "../Common/loading";
import LoadingSpinner from "../Common/LodingSpinneer";
import Coursel_home from "./Coursel";


function ReviewsCards() {
  const [reviews, setReviews] = useState(null); // To store the fetched reviews
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null); // To handle any errors
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility
  const [feedback, setFeedback] = useState(""); // To store feedback for the popup

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/courses/reviews/all`, {
        withCredentials: true,
      });
      setReviews(response?.data?.data);
      if (!response) {
        throw new Error("Failed to fetch reviews");
      }
    } catch (err) {
      setError(err.message); // If there's an error, set the error state
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurs
    }
  };

  console.log(reviews);
  useEffect(() => {
    // Fetch function
    fetchReviews(); // Trigger the fetch operation
  }, []); // Empty dependency array means it runs once when the component mounts

  const handleButtonClick = (feedback) => {
    setFeedback(feedback); // Set the feedback for the popup
    setShowPopup(true); // Show the popup
  };

   // Safe date formatter
  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return "Invalid Date"; // fallback
    }
    return format(new Date(dateString), "dd MMM yyyy"); // e.g., 22 Jul 2025
  };

  const closePopup = () => {
    setShowPopup(false); // Hide the popup
    setFeedback(""); // Clear the feedback
  };

  if (loading) {
    return <div>{<LoadingSpinner />}</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  // Map the reviews before rendering
  const mappedReviews = reviews.map((val, ind) => (
    <Card id="CardContainer" key={ind}>
      <div>
        <img src={val.image} alt="Circular Photo" className="circular-photo" />
      </div>
      <Card.Body>
        <Card.Title className="card-name">{val.name}</Card.Title>
        <Card.Title>{val.courseName}</Card.Title>
        <Card.Text>
          <b>Difficulty Level:</b> {val.difficultyLevel}
        </Card.Text>
        <Card.Text>Suggestions: {val.suggestions}</Card.Text>
        <div className="rat-dat">
          <Card.Text>
            Rating: {val.rating}
            <i className="fa-solid fa-star"></i>
          </Card.Text>
          <Card.Text>
            {" "}
            <b>Date: </b>
            {formatDate(val?.date)}
          </Card.Text>
        </div>
        <p className="ReviewType">ReviewType:{val.reviewType}</p>
        <div className="ReviewButton">
          <button
            className="btn_positive"
            onClick={() => handleButtonClick(val.feedback)}
          >
            Read Feedback
          </button>
        </div>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      <Coursel_home />
      <div className="review-main-div">
        <h2 className="testimonilas">Testimonials</h2>
        <hr />
        <div className="reviwCard-Container">{mappedReviews}</div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{feedback}</p>
            <button onClick={closePopup} className="popup-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewsCards;
