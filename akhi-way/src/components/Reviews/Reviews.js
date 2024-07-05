import React, { useState } from "react";
import { addReview } from "../Data/RestaurantsData";
import "./Reviews.css";

function Reviews({ reviews, restaurantId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [order, setOrder] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState(reviews);
  const [message, setMessage] = useState("");

  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="stars">
        {[...Array(totalStars)].map((star, index) => {
          index += 1;
          return (
            <span key={index} className={index <= rating ? "on" : "off"}>
              &#9733;
            </span>
          );
        })}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !order || !reviewText) {
      setMessage("Please fill in all fields.");
      return;
    }

    const newReview = {
      rating,
      date: new Date().toLocaleDateString(),
      author: "Anonymous",
      text: reviewText,
      order: order,
    };

    addReview(restaurantId, newReview);
    setReviewList([...reviewList, newReview]);
    setRating(0);
    setHover(0);
    setOrder("");
    setReviewText("");
    setMessage("Review submitted successfully!");
  };

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>
      {reviewList.map((review, index) => (
        <div key={index} className="restaurant-review">
          <div className="review-header">
            {renderStars(review.rating)}
            <div className="review-date">Dined on {review.date}</div>
          </div>
          <div className="review-summary">
            <span className="review-rating">Overall {review.rating}</span>
            <span className="review-author">{review.author}</span>
          </div>
          <p className="review-text">{review.text}</p>
        </div>
      ))}
      <div className="review-form">
        <h3>How would you rate your experience?</h3>
        <div className="stars">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <span
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>What did you order?</label>
            <input type="text" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Enter text" />
          </div>
          <div className="form-group">
            <label>Write your review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Enter text"
            ></textarea>
          </div>
          <button type="submit" className="submit-review-btn">
            SUBMIT REVIEW
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Reviews;
