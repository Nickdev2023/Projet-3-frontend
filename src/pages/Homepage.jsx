import NavBar from "../components/Navbar";
import GymPhoto from "../images/gym.jpeg";
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
      <img src={GymPhoto} alt="" className="homePicture" />
    </div>
  );
}

export default HomePage;
