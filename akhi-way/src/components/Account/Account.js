import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";

const Account = () => {
  return (
    <div className="account-container">
      <h2>Account Settings</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dietary-preferences">Dietary Preferences</Link>
          </li>
          <li>
            <Link to="/meetups">Meetups</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Account;
