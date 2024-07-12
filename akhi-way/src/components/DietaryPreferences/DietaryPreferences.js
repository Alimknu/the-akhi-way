import React, { useState, useEffect } from "react";
import "./DietaryPreferences.css";
import BackButton from "../BackButton/BackButton";

const DietaryPreferences = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [preferredCuisines, setPreferredCuisines] = useState("");
  const [calorieIntake, setCalorieIntake] = useState("");
  const [preferencesSaved, setPreferencesSaved] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const savedPreferences = JSON.parse(localStorage.getItem(`${user}_dietaryPreferences`));
    if (savedPreferences) {
      setDietaryRestrictions(savedPreferences.dietaryRestrictions);
      setPreferredCuisines(savedPreferences.preferredCuisines);
      setCalorieIntake(savedPreferences.calorieIntake);
      setPreferencesSaved(true);
    }
  }, []);

  const validate = () => {
    const errors = {};
    if (!dietaryRestrictions.trim()) {
      errors.dietaryRestrictions = "Dietary restrictions cannot be empty.";
    }
    if (!preferredCuisines.trim()) {
      errors.preferredCuisines = "Preferred cuisines cannot be empty.";
    }
    if (!calorieIntake || calorieIntake <= 0) {
      errors.calorieIntake = "Calorie intake must be a positive number.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const user = localStorage.getItem("currentUser");
    const preferences = {
      dietaryRestrictions,
      preferredCuisines,
      calorieIntake,
    };
    localStorage.setItem(`${user}_dietaryPreferences`, JSON.stringify(preferences));
    setPreferencesSaved(true);
    alert("Dietary preferences saved!");
  };

  return (
    <div className="dietary-preferences-container">
      <BackButton />
      <h2>Dietary Preferences</h2>
      <form className="dietary-preferences-form" onSubmit={handleSubmit}>
        <label>
          Dietary Restrictions:
          <input type="text" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} />
          {errors.dietaryRestrictions && <p className="error">{errors.dietaryRestrictions}</p>}
        </label>
        <label>
          Preferred Cuisines:
          <input type="text" value={preferredCuisines} onChange={(e) => setPreferredCuisines(e.target.value)} />
          {errors.preferredCuisines && <p className="error">{errors.preferredCuisines}</p>}
        </label>
        <label>
          Calorie Intake:
          <input type="number" value={calorieIntake} onChange={(e) => setCalorieIntake(e.target.value)} />
          {errors.calorieIntake && <p className="error">{errors.calorieIntake}</p>}
        </label>
        <button type="submit">Save Dietary Preferences</button>
      </form>
      {preferencesSaved && (
        <div className="saved-preferences">
          <h3>Saved Preferences</h3>
          <p>
            <strong>Dietary Restrictions:</strong> {dietaryRestrictions}
          </p>
          <p>
            <strong>Preferred Cuisines:</strong> {preferredCuisines}
          </p>
          <p>
            <strong>Calorie Intake:</strong> {calorieIntake}
          </p>
        </div>
      )}
    </div>
  );
};

export default DietaryPreferences;
