import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} />
            <Route
              path="/dietary-preferences"
              element={isLoggedIn ? <DietaryPreferences /> : <Navigate to="/login" />}
            />
            <Route path="/meetups" element={isLoggedIn ? <Meetups /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
