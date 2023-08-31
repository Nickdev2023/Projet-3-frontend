import NavBar from "../components/Navbar";
import ProfilCreateForm from "../components/ProfilCreateForm";
import { useState, useEffect } from "react";
import myApi from "../api/service";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Userpage() {
  const [profil, setProfil] = useState([]);
  const [showResults, setShowResults] = useState(false);

  function toggle(e) {
    if (e.target.value === "Create profil") {
      setShowResults((showResults) => !showResults);
    }
  }

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

      <div>
        <button
          className="button"
          type="submit"
          value="Create profil"
          onClick={toggle}
        >
          Create Profil
        </button>
        {showResults && <ProfilCreateForm />}
      </div>
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
