import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ExerciseEditForm from "../components/ExerciseEditForm";

const API_URL = import.meta.env.VITE_API_URL;

function Exercisepage() {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({});
  let params = useParams();

  const getExercise = () => {
    let exerciceId = params.exerciceId;

    myApi
      .get(`${API_URL}/api/exercices/${exerciceId}`)
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getExercise();
  }, []);
  const handleDeleteExercise = () => {
    let exerciceId = params.exerciceId;
    myApi
      .delete(`${API_URL}/api/exercices/${exerciceId}`)
      .then(() => navigate(`/workouts`))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <NavBar />
      <ExerciseEditForm />
      <p>Exercise Page</p>
      <div>
        <h1>{exercise.exerciceName}</h1>

        <p>Sets:{exercise.sets}</p>
        <p>Repetition:{exercise.repetition}</p>
        <p>weight:{exercise.weight}</p>
        <div>
          <button type="submit" onClick={handleDeleteExercise}>
            Delete the exercice
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exercisepage;
