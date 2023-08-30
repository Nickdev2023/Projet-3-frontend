import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myApi from "../api/service";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_WORKOUT_FORM_VALUES = {
  workoutName: "",
  duration: "",
  day: "-1",
  category: "-1",
};

function WorkoutEditForm() {
  const [workout, setWorkout] = useState({ ...DEFAULT_WORKOUT_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);

  let params = useParams();
  let workoutId = params.workoutId;

  // useEffect(() => {
  //   getWorkout();
  // }, []);

  // const getWorkout = () => {
  //   myApi
  //     .get(`${API_URL}/api/workouts/${workoutId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setWorkout(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...workout, workout: workoutId };

    setSubmitting(true);

    myApi
      .put(`${API_URL}/api/workouts/${workoutId}`, requestBody)
      .then(() => {
        console.log(requestBody);
        // Reset the state to clear the inputs
        // setWorkout({
        //   ...DEFAULT_WORKOUT_FORM_VALUES,
        // });
        setSubmitting(false);
        // getAllWorkouts();
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    setWorkout((prevStudent) => ({
      ...prevStudent,
      [name]: inputValue,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>
        <div>
          <label>Workout Name:</label>
          <input
            type="text"
            name="workoutName"
            value={workout.workoutName}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={workout.duration}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div>
          <label>When do you want to train ? </label>
          <select
            name="day"
            value={workout.day}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Please select a day
            </option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div>
          <label>Muscle group:</label>
          <select
            name="category"
            value={workout.category}
            onChange={handleChange}
            disabled={submitting}
          >
            <option disabled value="-1">
              Please select a group
            </option>
            <option value="Chest">Chest</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Legs">Legs</option>
            <option value="Back">Back</option>
            <option value="Abs">Abs</option>
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

export default WorkoutEditForm;
