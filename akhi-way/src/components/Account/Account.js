import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Account.css";

const Account = () => {
  const { t } = useTranslation();

  return (
    <div className="account-container">
      <h2>{t("Account Settings")}</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dietary-preferences">{t("Dietary Preferences")}</Link>
          </li>
          <li>
            <Link to="/meetups">{t("Meetups")}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Account;
