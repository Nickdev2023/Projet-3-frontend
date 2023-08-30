import { useState, useEffect } from "react";
import myApi from "../api/service";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import ProfilEditpage from "../components/ProfilEditForm";

const API_URL = import.meta.env.VITE_API_URL;

function ProfilDetailpage() {
  const [profil, setProfil] = useState("");
  let params = useParams();

  const getProfil = () => {
    let profilId = params.profilId;
    myApi
      .get(`${API_URL}/api/profil/${profilId}`)
      .then((response) => {
        console.log(response.data);
        setProfil(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfil();
  }, [profil]);

  return (
    <div>
      <NavBar />
      <ProfilEditpage />
      <div>
        <h1>{profil.name}</h1>
        <p>Age: {profil.age}</p>
        <p>Sex: {profil.sex}</p>
        <p>Height: {profil.height} m</p>
        <p>Current weight: {profil.currentWeight} kg</p>
        <p>Goal weight: {profil.goalWeight} kg</p>
        <p>Physical activity level: {profil.physicalActivityLevel}</p>
        <p>Daily calorie consumption: {profil.dailyCalories} cal</p>
        <p>Fitness level: {profil.fitnessLevel}</p>
        <p>Number of training per week: {profil.numberOfTraining} times</p>
        <p>Body goal: {profil.bodyGoal}</p>
      </div>
    </div>
  );
}

export default ProfilDetailpage;
