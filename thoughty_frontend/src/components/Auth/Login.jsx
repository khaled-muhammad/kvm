import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../../services/firebase";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Placeholder for handling email login.
  // You can integrate email/password login logic here using Firebase's signInWithEmailAndPassword
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Example:
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   navigate("/");
    // } catch (error) {
    //   setError(error.message);
    // }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login to Thoughty</h2>
      {error && <p className={styles.errorText}>{error}</p>}
      
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Continue with Google
      </button>

      <div className={styles.orText}>or</div>

      <form onSubmit={handleEmailLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>

      <p className={styles.registerText}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.registerLink}>
          Register here
        </Link>
      </p>
    </div>
  );
}
