import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton/BackButton";
import "./Meetups.css";

const Meetups = () => {
  const { t } = useTranslation();
  const [meetups, setMeetups] = useState([]);
  const [step, setStep] = useState(1);
  const [restaurant, setRestaurant] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [friends, setFriends] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const savedMeetups = JSON.parse(localStorage.getItem(`${user}_meetups`)) || [];
    setMeetups(savedMeetups);
  }, []);

  const validate = () => {
    const errors = {};
    if (!restaurant.trim()) {
      errors.restaurant = t("Restaurant cannot be empty.");
    }
    if (!date) {
      errors.date = t("Date cannot be empty.");
    } else if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
      errors.date = t("Date cannot be today or in the past.");
    }
    if (!time) {
      errors.time = t("Time cannot be empty.");
    }
    if (!friends.trim()) {
      errors.friends = t("Friends' emails cannot be empty.");
    } else {
      const emailArray = friends.split(",");
      for (let email of emailArray) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          errors.friends = t("Please enter valid email addresses.");
          break;
        }
      }
    }
    return errors;
  };

  const handleNextStep = () => {
    const validationErrors = {};
    if (step === 1 && !restaurant.trim()) {
      validationErrors.restaurant = t("Restaurant cannot be empty.");
    }
    if (step === 2) {
      if (!date) {
        validationErrors.date = t("Date cannot be empty.");
      } else if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
        validationErrors.date = t("Date cannot be today or in the past.");
      }
    }
    if (step === 3 && !time) {
      validationErrors.time = t("Time cannot be empty.");
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const meetup = { restaurant, date, time, friends };
    const user = localStorage.getItem("currentUser");
    const updatedMeetups = [...meetups, meetup];
    setMeetups(updatedMeetups);
    localStorage.setItem(`${user}_meetups`, JSON.stringify(updatedMeetups));
    setStep(1); // Reset the form
    setRestaurant("");
    setDate("");
    setTime("");
    setFriends("");
    alert(t("Meetup saved and shared with friends!"));
  };

  const handleDelete = (index) => {
    if (
      window.confirm(
        t("Are you sure you want to cancel this meetup? A cancellation email will be sent to all recipients.")
      )
    ) {
      const user = localStorage.getItem("currentUser");
      const updatedMeetups = meetups.filter((_, i) => i !== index);
      setMeetups(updatedMeetups);
      localStorage.setItem(`${user}_meetups`, JSON.stringify(updatedMeetups));
      // Simulate email notification
      alert(t("Meetup cancelled and email notification sent to all friends."));
    }
  };

  const progressWidth = () => {
    switch (step) {
      case 1:
        return "0%";
      case 2:
        return "33%";
      case 3:
        return "66%";
      case 4:
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="meetups-container">
      <BackButton />
      <h2>{t("Upcoming Meetups")}</h2>
      {meetups.length > 0 ? (
        <ul>
          {meetups.map((meetup, index) => (
            <li key={index} className="meetup-item">
              <span>
                {t("Restaurant")}: {meetup.restaurant}, {t("Date")}: {meetup.date}, {t("Time")}: {meetup.time},{" "}
                {t("Friends")}: {meetup.friends}
              </span>
              <button className="delete-button" onClick={() => handleDelete(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("No meetups scheduled.")}</p>
      )}

      <h2>{t("Plan a New Meetup")}</h2>
      <div class="spacer"></div>
      <form className="meetup-form" onSubmit={handleSubmit}>
        <div className="progress-bar">
          <div className="progress" style={{ width: progressWidth() }}></div>
          <div className={`progress-step ${step >= 1 ? "active" : ""}`} data-step="1"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`} data-step="2"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`} data-step="3"></div>
          <div className={`progress-step ${step >= 4 ? "active" : ""}`} data-step="4"></div>
        </div>
        {step === 1 && (
          <div className="form-step">
            <label>
              {t("Restaurant")}:
              <input
                type="text"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                placeholder={t("Enter restaurant name")}
                required
              />
              {errors.restaurant && <p className="error">{errors.restaurant}</p>}
            </label>
          </div>
        )}
        {step === 2 && (
          <div className="form-step">
            <label>
              {t("Date")}:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder={t("Select a date")}
                required
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="form-step">
            <label>
              {t("Time")}:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder={t("Select a time")}
                required
              />
              {errors.time && <p className="error">{errors.time}</p>}
            </label>
          </div>
        )}
        {step === 4 && (
          <div className="form-step">
            <label>
              {t("Friends")}:
              <input
                type="text"
                value={friends}
                onChange={(e) => setFriends(e.target.value)}
                placeholder={t("Enter friends' emails, separated by commas")}
                required
              />
              {errors.friends && <p className="error">{errors.friends}</p>}
            </label>
          </div>
        )}
        <div className="button-container">
          <button type="button" className="previous-button" onClick={handlePreviousStep}>
            {t("Previous")}
          </button>
          {step < 4 ? (
            <button type="button" className="next-button" onClick={handleNextStep}>
              {t("Next")}
            </button>
          ) : (
            <button type="submit" className="submit-button">
              {t("Submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Meetups;
