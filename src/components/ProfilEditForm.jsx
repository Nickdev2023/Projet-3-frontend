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

function ProfilEditpage() {
  const [profil, setProfil] = useState({ ...DEFAULT_PROFIL_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);
  let params = useParams();
  let profilId = params.profilId;

  useEffect(() => {
    getProfil();
  }, []);

  const getProfil = () => {
    myApi
      .get(`${API_URL}/api/profil/${profilId}`)
      .then((response) => {
        console.log(response.data);
        setProfil(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...profil, profil: profilId };

    setSubmitting(true);

    myApi
      .put(`${API_URL}/api/profil/${profilId}`, requestBody)
      .then(() => {
        // Reset the state to clear the inputs
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
        <h3>Edit an Profil</h3>
        <div>
          <label>Name:</label>
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
          <label>Sex:</label>
          <input
            type="text"
            name="sex"
            value={profil.sex}
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
          <label>Current weight:</label>
          <input
            type="text"
            name="currentWeight"
            value={profil.currentWeight}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Goal weight:</label>
          <input
            type="text"
            name="goalWeight"
            value={profil.goalWeight}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label>Daily calorie consumption:</label>
          <input
            type="text"
            name="dailyCalories"
            value={profil.dailyCalories}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Number of training per week:</label>
          <input
            type="text"
            name="numberOfTraining"
            value={profil.numberOfTraining}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Physical activity level:</label>
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
          <label>Fitness level:</label>
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
            <option value="Back">Back</option>
            <option value="Abs">Abs</option>
          </select>
        </div>

        <div>
          <label>Body goal:</label>
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

export default ProfilEditpage;
