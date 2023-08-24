import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import HomePage from "./pages/Homepage";
import Userpage from "./pages/Userpage";
import Workoutpage from "./pages/WorkoutHomepage";
import CreateExercise from "./pages/CreateExercise";
import CreateWorkout from "./pages/CreateWorkout";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/user" element={<Userpage />} />
        <Route exact path="/workouts" element={<Workoutpage />} />
        <Route exact path="/createExercise" element={<CreateExercise />} />
        <Route exact path="/createWorkout" element={<CreateWorkout />} />
      </Routes>
    </div>
  );
}

export default App;
