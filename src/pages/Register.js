import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://daily-motivation-backend-1.onrender.com/api/auth/register", formData);
                // Show success message
                Swal.fire({
                    title: "Success!",
                    text: "Registration Successful! Please log in.",
                    icon: "success",
                    confirmButtonColor: "#4a154b",
                }).then(() => {
                    navigate("/login"); // Redirect after confirmation
                });
        } catch (error) {
            console.error(error);
             // Show error message
             Swal.fire({
                title: "Error!",
                text: "Error registering user. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" 
             style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <div className="card shadow-lg p-4 border-0" 
                 style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}>
                <div className="card-body">
                    <h3 className="text-center fw-bold" style={{ color: "#4a154b" }}>Create an Account</h3>
                    <p className="text-center text-muted">Sign up to get started!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Username</label>
                            <input type="text" name="username" className="form-control rounded-3" 
                                   onChange={handleChange} required placeholder="Enter your username" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email</label>
                            <input type="email" name="email" className="form-control rounded-3" 
                                   onChange={handleChange} required placeholder="Enter your email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Password</label>
                            <input type="password" name="password" className="form-control rounded-3" 
                                   onChange={handleChange} required placeholder="Enter your password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 rounded-3">Sign Up</button>
                    </form>

                    <p className="text-center mt-3 text-muted">
                        Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
