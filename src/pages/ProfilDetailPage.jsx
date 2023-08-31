import { useState, useEffect } from "react";
import myApi from "../api/service";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import ProfilEditpage from "../components/ProfilEditForm";

const API_URL = import.meta.env.VITE_API_URL;

function ProfilDetailpage() {
  const [profil, setProfil] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [calories, setCalories] = useState(0);
  const [bmi, setBmi] = useState(0);
  let params = useParams();

  function toggle(e) {
    if (e.target.value === "Edit profil") {
      setShowResults((showResults) => !showResults);
    }
  }
  useEffect(() => {
    if (profil.bodyGoal === "Loose fat") {
      const calculatedCalories = profil.dailyCalories - 250;
      setCalories(calculatedCalories);
    } else {
      const calculatedCalories = profil.dailyCalories + 250;
      setCalories(calculatedCalories);
    }
  });

  useEffect(() => {
    const bmi = profil.currentWeight / (profil.height * profil.height);
    setBmi(bmi.toFixed(2));
  });

  const getProfil = () => {
    let profilId = params.profilId;
    myApi
      .get(`${API_URL}/api/profil/${profilId}`)
      .then((response) => {
        // console.log(response.data);
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

      <div>
        <button
          className="button"
          type="submit"
          value="Edit profil"
          onClick={toggle}
        >
          Edit Profil
        </button>
        {showResults && <ProfilEditpage />}
      </div>

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
        {/* <button onClick={calculateCalories}>Calculate Calories</button> */}
        <p>Based on your goals you should consume: {calories} calories</p>
        <p>Your BMI is: {bmi}</p>
      </div>
    </div>
  );
}

export default ProfilDetailpage;
