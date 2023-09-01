import NavBar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  return (
    <div>
      <div>
        <div className="navBar">
          <NavBar />
        </div>
      </div>
      <p className="titleHome">Home Page</p>
    </div>
  );
}

export default HomePage;
