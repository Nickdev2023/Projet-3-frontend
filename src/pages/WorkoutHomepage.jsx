import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
import WorkoutCreateForm from "../components/WorkoutCreateForm";

const API_URL = import.meta.env.VITE_API_URL;

function Workoutpage() {
  const [workout, setWorkouts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  function toggle() {
    setShowResults((showResults) => !showResults);
  }

  const getAllWorkouts = () => {
    myApi
      .get(`${API_URL}/api/workouts`)
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <button type="submit" value="Create Workout" onClick={toggle}>
          Create Workout 🖊️
        </button>
        {showResults && <WorkoutCreateForm getAllWorkouts={getAllWorkouts} />}
      </div>

      <p>Workouts Page</p>
      {workout.map((workout) => {
        return (
          <div key={workout._id}>
            <Link to={`/workouts/${workout._id}`}>
              <h1>{workout.workoutName}</h1>
            </Link>
            <h2>Category: {workout.category}</h2>
            <p>Duration: {workout.duration} minutes</p>
          </div>
        );
      })}
    </div>
  );
}

export default Workoutpage;
