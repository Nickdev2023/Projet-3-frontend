import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
import WorkoutCreateForm from "../components/WorkoutCreateForm";
import WorkoutEditForm from "../components/WorkoutEditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
const API_URL = import.meta.env.VITE_API_URL;

function Workoutpage() {
  const [workout, setWorkouts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function toggle(e) {
    if (e.target.value === "Create Workout") {
      setShowResults((showResults) => !showResults);
    } else if (e.target.value === "Edit Workout") {
      setShowEdit((showEdit) => !showEdit);
    }
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
      <div className="navBar">
        <NavBar />
      </div>

      <h1 className="workoutTitle">Workouts </h1>
      <div>
        <button
          className="button"
          type="submit"
          value="Create Workout"
          onClick={toggle}
        >
          Create a Workout
        </button>
        {showResults && <WorkoutCreateForm getAllWorkouts={getAllWorkouts} />}
      </div>
      {workout.map((workout) => {
        return (
          <div className="workoutBox" key={workout._id}>
            <h2 className="workoutBackground head">
              Category: {workout.category}
            </h2>
            <Link to={`/workouts/${workout._id}`}>
              <h1 className="workoutBackground titleWorkout">
                {workout.workoutName}
              </h1>
            </Link>
            <p className="workoutBackground feet">
              <FontAwesomeIcon icon={faStopwatch} /> {workout.duration} minutes
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Workoutpage;
