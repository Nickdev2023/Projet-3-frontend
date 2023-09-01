import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
import ExerciseCreateForm from "../components/ExerciseCreateForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import WorkoutEditForm from "../components/WorkoutEditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_API_URL;

function SingleWorkout() {
  const [workout, setWorkout] = useState("");
  let params = useParams();
  let workoutId = params.workoutId;
  const [showResults, setShowResults] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();

  function toggle(e) {
    if (e.target.value === "Create Exercice") {
      setShowResults((showResults) => !showResults);
    } else if (e.target.value === "Edit Exercice") {
      setShowEdit((showEdit) => !showEdit);
    }
  }

  const getAllExercises = () => {
    myApi
      .get(`${API_URL}/api/workouts/${workoutId}`)
      .then((response) => {
        console.log(response);
        setWorkout(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  const handleDelete = () => {
    myApi
      .delete(`/api/workouts/${workoutId}`)
      .then(() => navigate(`/workouts`))
      .catch((error) => console.log(error));
  };

  const increaseWorkout = (exercise) => {
    myApi
      .put(`/api/exercices/${exercise._id}/increment`)
      .then((response) => {
        console.log(response);
        getAllExercises();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!Object.keys(workout).length)
    return <div className="loading">Loading</div>;

  return (
    <div>
      <div className="navBar">
        <NavBar />
      </div>
      <h1>Workout: {workout.workout.workoutName}</h1>
      {/* <pre>{JSON.stringify(workout, null, 2)}</pre> */}
      {/* <ExerciseCreateForm /> */}
      <div className="editAndCreateWorkout">
        <div>
          <button
            className="button workoutButton"
            type="submit"
            value="Edit Exercice"
            onClick={toggle}
          >
            Edit Workout
          </button>
          {showEdit && <WorkoutEditForm getAllExercises={getAllExercises} />}
        </div>
        <div>
          <button
            className="button workoutButton deleteWorkout"
            type="submit"
            onClick={handleDelete}
          >
            Delete Workout
          </button>
        </div>
      </div>
      <div>
        <button
          className="button"
          type="submit"
          value="Create Exercice"
          onClick={toggle}
        >
          Create an Exercise
        </button>
        {showResults && (
          <ExerciseCreateForm getAllExercises={getAllExercises} />
        )}
      </div>

      {workout.exos.map((exercise) => {
        console.log("exercises:", exercise, workoutId);
        return (
          <div key={exercise._id}>
            <Link to={`/exercices/${exercise._id}`}>
              <h1>{exercise.exerciceName}</h1>
            </Link>

            <h2>
              <FontAwesomeIcon icon={faDumbbell} /> {exercise.weight} kg
            </h2>
            <p>Sets: {exercise.sets}</p>

            <p>Repetition: {exercise.repetition} times</p>

            <div>
              <p>You have done this exercise {exercise.counter} times</p>
              <button
                className="button"
                onClick={() => increaseWorkout(exercise)}
              >
                Exercise Done !
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SingleWorkout;
