import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import DietaryPreferences from "./components/DietaryPreferences/DietaryPreferences";
import Meetups from "./components/Meetups/Meetups";
import "./components/global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./i18n/i18n";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main role="main" aria-labelledby="main-content">
          <Routes>
            <Route path="/" element={<Home />} aria-labelledby="home-route" />
            <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} aria-labelledby="login-route" />
            <Route path="/restaurants" element={<RestaurantList />} aria-labelledby="restaurant-list-route" />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} aria-labelledby="restaurant-details-route" />
            <Route path="/aboutUs" element={<AboutUs />} aria-labelledby="about-us-route" />
            <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} aria-labelledby="account-route" />
            <Route
              path="/dietary-preferences"
              element={isLoggedIn ? <DietaryPreferences /> : <Navigate to="/login" />}
              aria-labelledby="dietary-preferences-route"
            />
            <Route path="/meetups" element={isLoggedIn ? <Meetups /> : <Navigate to="/login" />} aria-labelledby="meetups-route" />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
