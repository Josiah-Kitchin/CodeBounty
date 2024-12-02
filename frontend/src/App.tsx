

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import CreateProfile from "./pages/createProfile";


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogIn = () => {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Routes>
        {/* Default route redirects to login page if not logged in */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        
        <Route path="/login" element={<Login onLogin={handleLogIn} />} />
        
        <Route path="/signup" element={<Signup onLogin={handleLogIn} />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/createProfile" element={<CreateProfile />} />

      </Routes>
    </Router>
  );
};

export default App;
