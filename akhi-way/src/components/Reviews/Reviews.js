import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addReview, updateReview, deleteReview } from "../Data/RestaurantsData";
import "./Reviews.css";

function Reviews({ reviews, restaurantId, currentUser }) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [order, setOrder] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState(reviews);
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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
      setMessage(t("Please fill in all fields."));
      return;
    }

    const newReview = {
      rating,
      date: new Date().toLocaleDateString(),
      author: currentUser,
      text: reviewText,
      order: order,
    };

    if (editIndex !== null) {
      updateReview(restaurantId, editIndex, newReview);
      const updatedReviews = [...reviewList];
      updatedReviews[editIndex] = newReview;
      setReviewList(updatedReviews);
      setEditIndex(null);
      setMessage(t("Review updated successfully!"));
    } else {
      addReview(restaurantId, newReview);
      setReviewList([...reviewList, newReview]);
      setMessage(t("Review submitted successfully!"));
    }

    setRating(0);
    setHover(0);
    setOrder("");
    setReviewText("");
  };

  const handleEdit = (index) => {
    const review = reviewList[index];
    if (review.author !== currentUser) {
      setMessage(t("You can only edit your own reviews."));
      return;
    }
    setRating(review.rating);
    setHover(review.rating);
    setOrder(review.order);
    setReviewText(review.text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const review = reviewList[index];
    if (review.author !== currentUser) {
      setMessage(t("You can only delete your own reviews."));
      return;
    }
    deleteReview(restaurantId, index);
    const updatedReviews = reviewList.filter((_, i) => i !== index);
    setReviewList(updatedReviews);
    setMessage(t("Review deleted successfully!"));
  };

  return (
    <div className="reviews-section">
      <h2>{t("Reviews")}</h2>
      {reviewList.map((review, index) => (
        <div key={index} className="restaurant-review">
          <div className="review-header">
            {renderStars(review.rating)}
            <div className="review-date">
              {t("Dined on")} {review.date}
            </div>
          </div>
          <div className="review-summary">
            <span className="review-rating">
              {t("Overall")} {review.rating}
            </span>
            <span className="review-author">{review.author}</span>
          </div>
          <p className="review-text">{review.text}</p>
          {review.author === currentUser && (
            <>
              <button onClick={() => handleEdit(index)} className="edit-review-btn">
                {t("Edit")}
              </button>
              <button onClick={() => handleDelete(index)} className="delete-review-btn">
                {t("Delete")}
              </button>
            </>
          )}
        </div>
      ))}
      <div className="review-form">
        <h3>{t("How would you rate your experience?")}</h3>
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
            <label>{t("What did you order?")}</label>
            <input type="text" value={order} onChange={(e) => setOrder(e.target.value)} placeholder={t("Enter text")} />
          </div>
          <div className="form-group">
            <label>{t("Write your review")}</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={t("Enter text")}
            ></textarea>
          </div>
          <button type="submit" className="submit-review-btn">
            {editIndex !== null ? t("UPDATE REVIEW") : t("SUBMIT REVIEW")}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Reviews;
