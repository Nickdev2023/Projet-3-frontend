import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function SingleWorkout() {
  let params = useParams();
  let workoutId = params.workoutId;

  const [exercise, setExercises] = useState([]);

  const getAllExercises = () => {
    axios
      .get(`${API_URL}/api/exercices`)
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  return (
    <div>
      <NavBar />
      <p>Single workout page {workoutId}</p>

      {exercise.map((exercise) => {
        console.log("exercises:", exercise, workoutId);
        if (exercise.workout[0] === workoutId) {
          // console.log("ok");
          return (
            <div key={exercise._id}>
              <h1>{exercise.exerciceName}</h1>

              <h2>{exercise.sets}</h2>
              <p>{exercise.weight} kg</p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default SingleWorkout;
