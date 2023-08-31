import { Link } from "react-router-dom";
import React from "react";
import "./../App.css";
import Logo from "../images/FitnessDiary.png";
function NavBar() {
  function logout() {
    localStorage.removeItem("token");
  }
  return (
    <>
      <nav>
        <div>
          <Link to="/home">
            <img src={Logo} alt="" className="logoNavBar" />
          </Link>
        </div>
        <div>
          <Link className="linkNavBar" to="/workouts">
            Workouts
          </Link>
          {/* <Link className="linkNavBar" to="/home">
            Home
          </Link> */}
          <Link className="linkNavBar" to="/profil">
            Profil
          </Link>
          <Link to="/">
            <button className="buttonLogout" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
