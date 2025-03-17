import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Thought/ThoughtList";
import ThoughtDetail from "./components/Thought/ThoughtDetail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ThoughtForm from "./components/Thought/ThoughtForm";
import ThoughtyHome from "./components/landingPage";
import ProfilePage from "./components/Auth/UserProfile";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<ThoughtyHome />} />
            <Route path="/thoughts" element={<Home />} />
            <Route path="/thoughts/:id" element={<ThoughtDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<ThoughtForm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;