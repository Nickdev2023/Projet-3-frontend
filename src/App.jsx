import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/Loginpage";
import HomePage from "./pages/Homepage";
import Userpage from "./pages/Userpage";
import Workoutpage from "./pages/WorkoutHomepage";
import SingleWorkout from "./pages/SingleWorkout";
import CreateWorkout from "./pages/CreateWorkout";
import CreateExercise from "./pages/CreateExercise";
import SignupPage from "./pages/SignInPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<NavBar />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/user" element={<Userpage />} />
        <Route exact path="/workouts" element={<Workoutpage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/workouts/:workoutId" element={<SingleWorkout />} />
        <Route exact path="/createWorkout" element={<CreateWorkout />} />
        <Route exact path="/createExercise" element={<CreateExercise />} />
      </Routes>
    </div>
  );
}

export default App;
