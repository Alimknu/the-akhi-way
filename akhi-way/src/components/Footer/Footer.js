import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>{t("The Akhi Way")}</h3>
          <p>&copy; 2024 {t("The Akhi Way")}</p>
        </div>
        <div className="footer-section links">
          <h3>{t("Quick Links")}</h3>
          <ul>
            <li>
              <Link to="/">{t("Home")}</Link>
            </li>
            <li>
              <Link to="/restaurants">{t("Restaurants")}</Link>
            </li>
            <li>
              <Link to="/aboutUs">{t("About Us")}</Link>
            </li>
            <li>
              <Link to="/account">{t("Account")}</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>{t("Contact Us")}</h3>
          <p>{t("Email")}: contact@theakhiway.com</p>
          <p>{t("Phone")}: +123 456 7890</p>
        </div>
        <div className="footer-section social">
          <h3>{t("Follow Us")}</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
