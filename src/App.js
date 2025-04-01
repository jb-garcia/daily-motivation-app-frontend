import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication



  // Simulate login (replace with real authentication logic)
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect '/' to '/login' if not authenticated */}
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/home" />} />

        {/* Login Page (Handles Authentication) */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Register Page */}
        <Route path="/register" element={<Register />} />
        
        {/* Protected Home Route */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
