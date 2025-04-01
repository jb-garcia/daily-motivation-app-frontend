import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const response = await fetch("https://daily-motivation-backend-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userToken", data.token); // Store JWT token
        setIsAuthenticated(true);
        
        // Show success alert
        Swal.fire({
            title: "Login Successful!",
            text: "Welcome back! Redirecting to home...",
            icon: "success",
            confirmButtonColor: "#4a154b",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/home"); // Redirect after alert
          });
      } else {
        // Show error alert
        Swal.fire({
            title: "Login Failed",
            text: data.message || "Invalid username or password.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
      }
    } catch (error) {
      setError("Error connecting to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
      style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px"
      }}
    >
      <div 
        className="card shadow-lg border-0 text-center" 
        style={{ 
          maxWidth: "400px", 
          borderRadius: "15px", 
          padding: "30px",
          transition: "all 0.3s ease"
        }}
      >
        <div className="card-body">
          <h3 className="mb-3 fw-bold" style={{ color: "#4a154b" }}>Welcome Back</h3>
          <p className="text-muted">Sign in to continue</p>

          {error && <div className="alert alert-danger p-2">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control form-control-lg text-center"
                placeholder="Email" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control form-control-lg text-center"
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="btn btn-lg w-100 fw-bold"
              style={{ 
                backgroundColor: "#4a154b", 
                color: "white", 
                borderRadius: "10px"
              }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-3">
            <p className="text-muted">Don't have an account? 
              <a href="/register" style={{ color: "#4a154b", fontWeight: "bold", textDecoration: "none" }}> Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
