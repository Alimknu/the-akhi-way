import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      localStorage.setItem("currentUser", username);
      onLogin(true);
      navigate("/account");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">{t("Login")}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>{t("Username")}:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>{t("Password")}:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{t("Login")}</button>
      </form>
    </div>
  );
};

export default Login;
