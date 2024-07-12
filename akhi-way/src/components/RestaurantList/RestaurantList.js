import React, { useState } from "react";
import { Link } from "react-router-dom";
import restaurants from "../Data/RestaurantsData";
import "./RestaurantList.css";

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    return restaurants.filter((restaurant) => {
      const matchesSearchTerm =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriceRange = priceRange ? restaurant.priceRange === priceRange : true;

      return matchesSearchTerm && matchesPriceRange;
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceRange("");
  };

  const filteredRestaurants = handleSearch();

  return (
    <div className="restaurant-list">
      <h1>Search Restaurants</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or cuisine type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Select Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      </div>
      <div className="restaurant-results">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-item">
            <Link to={`/restaurant/${restaurant.id}`}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.cuisine}</p>
              <p>{restaurant.priceRange}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
