import { useState, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
