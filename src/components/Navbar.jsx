import { Link } from "react-router-dom";
import React from "react";
import "./../App.css";

function NavBar() {
  return (
    <>
      <nav>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/profil">Profil</Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
