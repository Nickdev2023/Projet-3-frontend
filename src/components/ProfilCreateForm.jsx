import { useState, useEffect } from "react";
import myApi from "../api/service";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PROFIL_FORM_VALUES = {
  name: "",
  age: "",
  currentWeight: "",
  goalWeight: "",
  height: "",
  sex: "-1",
  physicalActivityLevel: "-1",
  dailyCalories: "",
  fitnessLevel: "-1",
  numberOfTraining: "",
  bodyGoal: "-1",
};

function ProfilCreateForm() {
  const [profil, setProfil] = useState({ ...DEFAULT_PROFIL_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...profil };

    setSubmitting(true);

    myApi
      .post(`${API_URL}/api/profil`, requestBody)
      .then(() => {
        console.log(requestBody);
        // Reset the state to clear the inputs
        setProfil({ ...DEFAULT_PROFIL_FORM_VALUES });
        setSubmitting(false);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    setProfil((prevStudent) => ({
      ...prevStudent,
      [name]: inputValue,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create profil</h3>
        <div>
          <label>Your Name:</label>
          <input
            type="text"
            name="name"
            value={profil.name}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={profil.age}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Current Weight in kg:</label>
          <input
            type="text"
            name="currentWeight"
            value={profil.currentWeight}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label>Goal Weight:</label>
          <input
            type="text"
            name="goalWeight"
            value={profil.goalWeight}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="text"
            name="height"
            value={profil.height}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Sex:</label>
          <select
            name="sex"
            value={profil.sex}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Please select something
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Physical Activity Level:</label>
          <select
            name="physicalActivityLevel"
            value={profil.physicalActivityLevel}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Please select something
            </option>
            <option value="Extremely inactive">Extremely inactive</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Moderately active">Moderately active</option>
            <option value="Vigorously active">Vigorously active</option>
            <option value="Extremely active">Extremely active</option>
          </select>
        </div>
        <div>
          <label>Daily Calories consumption:</label>
          <input
            type="text"
            name="dailyCalories"
            value={profil.dailyCalories}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label>Fitness Level:</label>
          <select
            name="fitnessLevel"
            value={profil.fitnessLevel}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Please select something
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label>Weekly number of training:</label>
          <input
            type="text"
            name="numberOfTraining"
            value={profil.numberOfTraining}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Body Goal:</label>
          <select
            name="bodyGoal"
            value={profil.bodyGoal}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Please select something
            </option>
            <option value="Loose fat">Loose fat</option>
            <option value="Gain muscle">Gain muscle</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={submitting}>
            Save
          </button>
          {/* {!showResults ? <ExerciseCreateForm /> : null} */}
        </div>
      </form>
    </div>
  );
}

export default ProfilCreateForm;
