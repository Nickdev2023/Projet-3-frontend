import NavBar from "../components/Navbar";
import ProfilCreateForm from "../components/ProfilCreateForm";
import { useState, useEffect } from "react";
import myApi from "../api/service";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Userpage() {
  const [profil, setProfil] = useState([]);

  const getProfil = () => {
    myApi
      .get(`${API_URL}/api/profil`)
      .then((response) => {
        console.log(response.data);
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
        {profil.map((profil) => {
          return (
            <div key={profil._id}>
              <Link to={`/profil/${profil._id}`}>
                <h1>{profil.name}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Userpage;
