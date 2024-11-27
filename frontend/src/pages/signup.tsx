import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios.config";
import "./styles/signup.css";



/*  Signup Page */
/* ---------------------------------------------------------------------------------------------------- */
interface SignUpPageProps {
  onLogin: () => void;
}

const Signup: React.FC<SignUpPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);  // For error handling
  const [loading, setLoading] = useState(false);  // To manage loading state

  // Use the useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Show loading indicator while the request is being made
    setLoading(true);
    setError(null);  // Reset any previous error

    try {
      // Make the POST request to your API
      const response = await axiosInstance.post("/users", {
        username,
        email,
        password,
      });

      const { token, id } = response.data;
      // Handle the response (e.g., redirect to login on success)
      if (response.status === 201) {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        onLogin();
        navigate("/createProfile");
      }
    } catch (err: any) {
      // Handle errors (e.g., show error message)
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      // Hide loading indicator when the request is complete
      setLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    navigate("/login");  // Navigate to login page when the user clicks "Log In"
  };

  return (
    <div className="signup-container">
      <h1 className="welcome-message">
        Welcome to <span className="bounty-text">CodeBounty</span>
      </h1>
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="switch-link">
          Already have an account?{" "}
          <button onClick={handleSwitchToLogin} className="switch-btn">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;

