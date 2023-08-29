import NavBar from "../components/Navbar";
import ProfilCreateForm from "../components/ProfilCreateForm";
import { useState, useEffect } from "react";
import myApi from "../api/service";

const API_URL = import.meta.env.VITE_API_URL;

function Userpage() {
  const [profil, setProfil] = useState({});

  const getProfil = () => {
    myApi
      .get(`${API_URL}/api/profil`)
      .then((response) => {
        setProfil(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfil();
  }, []);

  return (
    <div>
      <NavBar />
      <ProfilCreateForm />
      <div>
        <h1>{profil.name}</h1>
      </div>
    </div>
  );
}

export default Userpage;
