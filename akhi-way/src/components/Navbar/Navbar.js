import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import logo from "../../assets/theakhiwaylogo.png";

function Navbar() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-name-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </Link>
        <Link to="/" className="navbar-title">
          The Akhi Way
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
      </ul>
      <div className="navbar-account">
        <Link to="/account">Account</Link>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className="language-select"
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
