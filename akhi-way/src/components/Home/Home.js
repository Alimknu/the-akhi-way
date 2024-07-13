import React from "react";
import { useTranslation } from "react-i18next";
import restaurants from "../Data/RestaurantsData";
import "./Home.css";

function Home() {
  const { t } = useTranslation();
  const featuredRestaurants = restaurants.slice(0, 4); // Display first four restaurants as featured

  return (
    <div className="home">
      <div className="home-welcome">
        <h1>{t("We'll show you how to eat, the Akhi Way!")}</h1>
        <p>{t("Find halal restaurants near you")}</p>
      </div>
      <div className="home-featured">
        <h2>{t("Featured Restaurants")}</h2>
        <div className="home-featured-list">
          {featuredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="home-featured-item">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <p>
                {t("Rating")}: {restaurant.rating}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
