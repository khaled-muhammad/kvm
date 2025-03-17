import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Register.module.css";

export default function Register() {
  // Additional fields are included for future use; currently, only email and password are used for Firebase.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple client-side check for password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.leftSide}>
          <div className={styles.container}>
            <div className={styles.logo}>
              Though<span>ty</span>
            </div>
            <h2>Sign Up</h2>
            <p>
              Already a member?{" "}
              <Link to="/login" className={styles.loginLink}>
                Log In Now
              </Link>
            </p>
            {error && <p className={styles.errorText}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
            <div className={styles.socialSignup}>
              <div className={styles.socialBtn}>
                <i className="fab fa-facebook-f"></i> Sign Up with Facebook
              </div>
              <div className={styles.socialBtn}>
                <i className="fab fa-google"></i> Sign Up with Google
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}></div>
      </section>
    </main>
  );
}
