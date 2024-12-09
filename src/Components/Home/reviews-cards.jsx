import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import "../../Styles/home-css/review-cards.css";
import Loading from "../Common/loading";
import Footer from "../Common/Footer";
import Coursel_home from "./Coursel";
import Navbar from "../Common/Navbar";

function ReviewsCards() {
  const [reviews, setReviews] = useState([]); // To store the fetched reviews
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Fetch function
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://giant-ambitious-danger.glitch.me/reviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json(); // Convert the response to JSON
        setReviews(data); // Set the reviews to state
      } catch (err) {
        setError(err.message); // If there's an error, set the error state
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };

    fetchReviews(); // Trigger the fetch operation
  }, []); // Empty dependency array means it runs once when the component mounts

  if (loading) {
    return <div>{<Loading />}</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  // Map the reviews before rendering
  const mappedReviews = reviews.map((val, ind) => (
    <Card style={{ width: "27rem" }} key={ind}>
      <div>
        <img src={val.image} alt="Circular Photo" className="circular-photo" />
      </div>
      <Card.Body>
        <Card.Title className="card-name">{val.name}</Card.Title>
        <Card.Title>{val.courseName}</Card.Title>
        <Card.Text>{val.feedback}</Card.Text>
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
            {val.date}
          </Card.Text>
        </div>
        <div className="ReviewButton">
          <button variant="primary" className="btn_positive">
            {val.reviewType}
          </button>
        </div>
      </Card.Body>
    </Card>
  ));

  // Render the mapped reviews
  return (
    <>
      {/* <Navbar/> */}
      <Coursel_home />
      <div className="review-main-div">
        <h2 className="testimonilas">Testimonilas</h2>
        <hr />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {mappedReviews}
        </div>
      </div>

      {/* <Footer/> */}
    </>
  );
}

export default ReviewsCards;
