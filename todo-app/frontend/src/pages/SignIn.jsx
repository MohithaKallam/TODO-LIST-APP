import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signin", formData);
      console.log("Login response:", res.data); // Debug

      if (res.data.success) {
        navigate("/dashboard");
      } else {
        console.error("Login failed:", res.data.message);
      }
    } catch (err) {
      console.error("Server error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-background"></div>

      <div className="top-right-links">
        <Link to="/home">Home</Link>
        <Link to="/signup">Signup</Link>
      </div>

      <div className="signin-popup">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
