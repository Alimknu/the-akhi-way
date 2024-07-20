import React from "react";
import { useTranslation } from "react-i18next";
import restaurants from "../Data/RestaurantsData";
import "./Home.css";

function Home() {
  const { t } = useTranslation();
  const featuredRestaurants = restaurants.slice(0, 4); // Display first four restaurants as featured

  return (
    <div className="home">
      <section className="home-welcome" aria-labelledby="home-welcome-heading">
        <h1 id="home-welcome-heading">{t("We'll show you how to eat, the Akhi Way!")}</h1>
        <p>{t("Find halal restaurants near you")}</p>
      </section>
      <section className="home-featured" aria-labelledby="featured-restaurants-heading">
        <h2 id="featured-restaurants-heading">{t("Featured Restaurants")}</h2>
        <div className="home-featured-list">
          {featuredRestaurants.map((restaurant) => (
            <article
              key={restaurant.id}
              className="home-featured-item"
              aria-labelledby={`restaurant-${restaurant.id}-name`}
            >
              <h3 id={`restaurant-${restaurant.id}-name`}>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <p>
                {t("Rating")}: {restaurant.rating}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
