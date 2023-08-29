import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
import ExerciseCreateForm from "../components/ExerciseCreateForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import WorkoutEditForm from "../components/WorkoutEditForm";
const API_URL = import.meta.env.VITE_API_URL;

function SingleWorkout() {
  let params = useParams();
  let workoutId = params.workoutId;
  const [showResults, setShowResults] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();
  const [workout, setWorkout] = useState({});

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
      .delete(`${API_URL}/api/workouts/${workoutId}`)
      .then(() => navigate(`/workouts`))
      .catch((error) => console.log(error));
  };
  // const handleDeleteExercise = () => {
  //   myApi
  //     .delete(`${API_URL}/api/exercices/${exerciceId}`)
  //     .then(() => navigate(`/workouts`))
  //     .catch((error) => console.log(error));
  // };
  if (!Object.keys(workout).length)
    return <div className="loading">Loading</div>;

  return (
    <div>
      <NavBar />
      <p>Single workout page</p>
      {/* <ExerciseCreateForm /> */}
      <div>
        <button type="submit" onClick={handleDelete}>
          Delete the workout
        </button>
      </div>
      <div>
        <button type="submit" value="Create Exercice" onClick={toggle}>
          Create Exercise 🖊️
        </button>
        {showResults && (
          <ExerciseCreateForm getAllExercises={getAllExercises} />
        )}
      </div>
      <div>
        <button type="submit" value="Edit Exercice" onClick={toggle}>
          Edit Workout 🖊️
        </button>
        {showEdit && <WorkoutEditForm getAllExercises={getAllExercises} />}
      </div>

      {workout.exos.map((exercise) => {
        console.log("exercises:", exercise, workoutId);
        return (
          <div key={exercise._id}>
            <Link to={`/exercices/${exercise._id}`}>
              <h1>{exercise.exerciceName}</h1>
            </Link>

            <h2>Sets: {exercise.sets}</h2>
            <p>Weight: {exercise.weight} kg</p>
            <p>🟢 🟠 🔴</p>
          </div>
        );
      })}
    </div>
  );
}

export default SingleWorkout;
