import { Link } from "react-router-dom";
import React from "react";
import "./../App.css";

function NavBar() {
  function logout() {
    localStorage.removeItem("token");
  }
  return (
    <>
      <nav>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/profil">Profil</Link>
        </div>
        <Link to="/">
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
