import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebase";
import "../css/Navbar.css"; // Import the CSS file with your styling

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header>
      <nav className="thoughty-home__nav">
        <Link to="/" className="thoughty-home__logo">
          <img src="./logo.png" alt="Thoughty Logo" />
        </Link>
        <ul className="thoughty-home__nav-list">
          {user ? (
            <>
              <li className="thoughty-home__nav-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="thoughty-home__nav-item">
                <Link to="/create">New Thought</Link>
              </li>
              <li className="thoughty-home__nav-item">
                <Link to="/thoughts">Marketplace</Link>
              </li>
              <li className="thoughty-home__nav-item">
                <button
                  onClick={handleLogout}
                  className="thoughty-home__button"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="thoughty-home__nav-item">
                <Link to="/login" className="thoughty-home__button">Login</Link>
              </li>
              <li className="thoughty-home__nav-item">
                <Link to="/register" className="thoughty-home__button">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
