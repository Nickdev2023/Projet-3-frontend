import { useState, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../images/fitguy.webp";
import Logo from "../images/FitnessDiary.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    const userToLogin = { email, password, name };
    axios
      .post(`${API_URL}/auth/login`, userToLogin)
      .then((response) => {
        console.log(response);

        localStorage.setItem("token", response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(error.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  }
  return (
    <div className="signupPage">
      <img src={Logo} alt="" className="logoNavBar" />
      <img className="backgroundSignup" src={BackgroundImage} alt="" />
      <form onSubmit={handleSubmit}>
        <div className="formSignIn">
          <div>
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} />{" "}
            </label>
            <input
              placeholder="Username"
              className="input"
              type="text"
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
            <input
              placeholder="Your email"
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input
              placeholder="Your password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="buttonLogout">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
