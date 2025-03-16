import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebase";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">MindVerse</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/create" className="text-white">New Thought</Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}