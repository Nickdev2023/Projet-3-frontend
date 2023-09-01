import { useState, useEffect } from "react";
import myApi from "../api/service";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_EXERCISE_FORM_VALUES = {
  exerciceName: "",
  sets: "",
  repetition: "",
  weight: "",
  exerciceType: "-1",
  category: "-1",
};

function ExerciseCreateForm({ getAllExercises }) {
  const [exercise, setExercise] = useState({ ...DEFAULT_EXERCISE_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);
  let params = useParams();
  let workoutId = params.workoutId;
  //   const [showResults, setShowResults] = useState(false);
  //   const onClick = () => setShowResults(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...exercise, workout: workoutId };

    setSubmitting(true);

    myApi
      .post(`${API_URL}/api/exercices`, requestBody)
      .then(() => {
        console.log(requestBody);
        // Reset the state to clear the inputs
        setExercise({ ...DEFAULT_EXERCISE_FORM_VALUES });
        setSubmitting(false);
        getAllExercises();
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    setExercise((prevStudent) => ({
      ...prevStudent,
      [name]: inputValue,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Exercise</h3>
        <div>
          <label>Exercice Name:</label>
          <input
            type="text"
            name="exerciceName"
            value={exercise.exerciceName}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Sets:</label>
          <input
            type="text"
            name="sets"
            value={exercise.sets}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Repetition:</label>
          <input
            type="text"
            name="repetition"
            value={exercise.repetition}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={exercise.weight}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Exercise Type:</label>
          <select
            name="exerciceType"
            value={exercise.exerciceType}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Select the type of exercise
            </option>
            <option value="Polyarticular">Polyarticular</option>
            <option value="Monoarticular">Monoarticular</option>
          </select>
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            value={exercise.category}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Select the muscle type
            </option>
            <option value="Chest">Chest</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Legs">Legs</option>
            <option value="Back">Back</option>
            <option value="Abs">Abs</option>
          </select>
        </div>

        <div>
          <button className="button" type="submit" disabled={submitting}>
            Save
          </button>
          {/* {!showResults ? <ExerciseCreateForm /> : null} */}
        </div>
      </form>
    </div>
  );
}

export default ExerciseCreateForm;
