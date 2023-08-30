import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/Loginpage";
import HomePage from "./pages/Homepage";
import Profilpage from "./pages/Profilpage";
import Workoutpage from "./pages/WorkoutHomepage";
import SingleWorkout from "./pages/SingleWorkout";
import CreateWorkout from "./pages/CreateWorkout";
import CreateExercise from "./pages/CreateExercise";
import SignupPage from "./pages/SignInPage";
import Exercisepage from "./pages/SingleExercisePage";
import Singlepage from "./pages/ExerciceHomePage";
import ProfilDetailpage from "./pages/ProfilDetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<NavBar />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profil" element={<Profilpage />} />
        <Route path="/profil/:profilId" element={<ProfilDetailpage />} />
        <Route path="/workouts" element={<Workoutpage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/workouts/:workoutId" element={<SingleWorkout />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
        <Route path="/createExercise" element={<CreateExercise />} />
        <Route path="/exercices" element={<Singlepage />} />
        <Route path="/exercices/:exerciceId" element={<Exercisepage />} />
      </Routes>
    </div>
  );
}

export default App;
