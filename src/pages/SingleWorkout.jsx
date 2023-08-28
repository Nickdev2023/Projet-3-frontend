import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
import ExerciseCreateForm from "../components/ExerciseCreateForm";

const API_URL = import.meta.env.VITE_API_URL;

function SingleWorkout() {
  let params = useParams();
  let workoutId = params.workoutId;
  const [showResults, setShowResults] = useState(false);

  function toggle() {
    setShowResults((showResults) => !showResults);
  }

  const [workout, setWorkout] = useState({});

  const getAllExercises = () => {
    myApi
      .get(`${API_URL}/api/workouts/${workoutId}`)
      .then((response) => {
        console.log(response.data);
        setWorkout(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  // if (!Object.keys(workout).length)
  //   return <div className="loading">Loading</div>;

  return (
    <div>
      <NavBar />
      <p>Single workout page</p>
      {/* <ExerciseCreateForm /> */}

      <div>
        <button type="submit" value="Create Exercice" onClick={toggle}>
          Create exercice
        </button>
        {showResults && <ExerciseCreateForm />}
      </div>
      {/* {workout.exercice.map((exercise) => {
        console.log("exercises:", exercise, workoutId);
        return (
          <div key={exercise._id}>
            <h1>{exercise.exerciceName}</h1>

            <h2>{exercise.sets}</h2>
            <p>{exercise.weight} kg</p>
          </div>
        );
      })} */}
    </div>
  );
}

export default SingleWorkout;
