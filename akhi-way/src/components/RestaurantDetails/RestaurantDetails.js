import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import restaurants from "../Data/RestaurantsData";
import "./RestaurantDetails.css";
import Reviews from "../Reviews/Reviews";
import BackButton from "../BackButton/BackButton";

function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const [showReviews, setShowReviews] = useState(false); // State to toggle reviews
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu popup
  const { t } = useTranslation();

  if (!restaurant) {
    return <div>{t("Restaurant not found")}</div>;
  }

  return (
    <div className="restaurant-details">
      <BackButton />
      <div className="restaurant-header">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <button className="view-menu-btn" onClick={() => setShowMenu(true)}>
          {t("VIEW MENU")}
        </button>
      </div>
      <div className="restaurant-rating">
        <div className="stars">
          {"★".repeat(Math.round(restaurant.rating))}
          {"☆".repeat(5 - Math.round(restaurant.rating))} {restaurant.rating}
        </div>
        <div className="reviews">
          {restaurant.reviews} {t("Reviews")}
        </div>
        <div className="price">{restaurant.priceRange}</div>
        <div className="cuisine-type">{restaurant.cuisine}</div>
      </div>
      <p className="restaurant-description">{restaurant.description}</p>
      <div className="restaurant-images">
        {restaurant.images.map((image, index) => (
          <img key={index} src={image} alt={`Restaurant ${index + 1}`} />
        ))}
      </div>
      <div className="restaurant-map">
        <img src="path-to-map-image.jpg" alt={t("Map to Restaurant")} />
      </div>
      <div className="restaurant-info">
        <p>
          <strong>{t("Location")}:</strong> {restaurant.location}
        </p>
        <p>
          <strong>{t("Hours of Operation")}:</strong> {restaurant.hours}
        </p>
        <p>
          <strong>{t("Phone Number")}:</strong> {restaurant.phone}
        </p>
      </div>
      <button className="expand-reviews-btn" onClick={() => setShowReviews(!showReviews)}>
        {showReviews ? t("Hide Reviews") : t("Show Reviews")}
      </button>
      {showReviews && <Reviews reviews={restaurant.reviewsData} />}

      {showMenu && (
        <div className="menu-popup">
          <div className="menu-popup-content">
            <button className="close-menu-btn" onClick={() => setShowMenu(false)}>
              X
            </button>
            <h2>{t("Menu")}</h2>
            <ul>
              {restaurant.menu.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantDetails;
