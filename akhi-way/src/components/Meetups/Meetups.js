import React, { useState, useEffect } from "react";
import "./Meetups.css";

const Meetups = () => {
  const [meetups, setMeetups] = useState([]);
  const [step, setStep] = useState(1);
  const [restaurant, setRestaurant] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [friends, setFriends] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const savedMeetups = JSON.parse(localStorage.getItem(`${user}_meetups`)) || [];
    setMeetups(savedMeetups);
  }, []);

  const handleNextStep = () => {
    if (step === 1 && restaurant) setStep(2);
    else if (step === 2 && date) setStep(3);
    else if (step === 3 && time) setStep(4);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 4 && friends) {
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
      alert("Meetup saved and shared with friends!");
    } else {
      alert("Please complete all fields before saving the meetup.");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to cancel this meetup? A cancellation email will be sent to all recipients.")) {
      const user = localStorage.getItem("currentUser");
      const updatedMeetups = meetups.filter((_, i) => i !== index);
      setMeetups(updatedMeetups);
      localStorage.setItem(`${user}_meetups`, JSON.stringify(updatedMeetups));
      // Simulate email notification
      alert("Meetup cancelled and email notification sent to all friends.");
    }
  };

  return (
    <div className="meetups-container">
      <h2>Upcoming Meetups</h2>
      {meetups.length > 0 ? (
        <ul>
          {meetups.map((meetup, index) => (
            <li key={index} className="meetup-item">
              <span>
                Restaurant: {meetup.restaurant}, Date: {meetup.date}, Time: {meetup.time}, Friends: {meetup.friends}
              </span>
              <button className="delete-button" onClick={() => handleDelete(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meetups scheduled.</p>
      )}

      <h2>Plan a New Meetup</h2>
      <form className="meetup-form" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <label>
              Restaurant:
              <input
                type="text"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                placeholder="Enter restaurant name"
                required
              />
            </label>
          </div>
        )}
        {step === 2 && (
          <div className="form-step">
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select a date"
                required
              />
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="form-step">
            <label>
              Time:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Select a time"
                required
              />
            </label>
          </div>
        )}
        {step === 4 && (
          <div className="form-step">
            <label>
              Friends (emails):
              <input
                type="text"
                value={friends}
                onChange={(e) => setFriends(e.target.value)}
                placeholder="Enter friends' emails (separated by commas)"
                required
              />
            </label>
          </div>
        )}
        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
          )}
          {step < 4 && (
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          )}
          {step === 4 && <button type="submit">Save Meetup</button>}
        </div>
      </form>
    </div>
  );
};

export default Meetups;
