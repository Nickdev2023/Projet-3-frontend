import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/signup`, user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  }
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username: </label>
          <input
            type="text"
            value={user.name}
            id="name"
            onChange={(e) =>
              setUser({ ...user, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, [e.target.id]: e.target.value })
            }
          />
        </div>
        <p className="error">{error}</p>
        <button className="button">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
