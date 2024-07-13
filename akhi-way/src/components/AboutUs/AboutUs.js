import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutUs.css";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="aboutus-container">
      <h1>{t("About Us")}</h1>
      <p>
        {t(
          "Welcome to The Akhi Way! We are passionate about bringing you the best halal dining experiences. Our mission is to connect you with top-notch restaurants that adhere to halal standards."
        )}
      </p>
      <p>
        {t(
          "Our team is dedicated to ensuring that you have access to a wide variety of halal options, from traditional cuisines to modern dishes. Whether you're planning a family gathering, organizing a meet-up with friends, or simply looking for a great meal, we've got you covered, the Akhi Way."
        )}
      </p>
    </div>
  );
};

export default AboutUs;
