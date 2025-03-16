import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Thought/ThoughtList";
import ThoughtDetail from "./components/Thought/ThoughtDetail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ThoughtForm from "./components/Thought/ThoughtForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thoughts/:id" element={<ThoughtDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<ThoughtForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;