import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

function Workoutpage() {
  const [workout, setWorkouts] = useState([]);

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
