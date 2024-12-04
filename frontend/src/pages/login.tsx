
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import axiosInstance from "../axios.config";


/*  Login Page */
/* ---------------------------------------------------------------------------------------------------- */

interface LoginPageProps {
  onLogin: () => void;
}

const Login: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);  // For error handling
  const [loading, setLoading] = useState(false);  // To manage loading state

  // Use the useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    // Show loading indicator while the request is being made
    setLoading(true);
    setError(null);  // Reset any previous error

    try {
      // Make the POST request to your API
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      // Handle the response (e.g., redirect to login on success)
      if (response.status === 200) {
        const { token, id } = response.data;

        // Store token and ID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        onLogin(); 
        navigate("/dashboard");
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

  const handleSwitchToSignup = () => {
    navigate("/signup");  // Navigate to login page when the user clicks "Log In"
  };




  return (
    <div className="login-container">
      <h1 className="welcome-message">
        Welcome to <span className="bounty-text">CodeBounty</span>
      </h1>
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="switch-link">
          Don't have an account?{" "}
          <button onClick={handleSwitchToSignup} className="switch-btn">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
