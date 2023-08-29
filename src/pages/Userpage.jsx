import NavBar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function Userpage() {
  return (
    <div>
      <NavBar />
      <p>User page</p>
    </div>
  );
}

export default Userpage;
