// src/pages/login/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss"; // Create the matching SCSS

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulate login (replace with Firebase Auth)
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-content">
          <h1>Digitize Your Inventory</h1>
          <p>
            Welcome to the future of inventory management. Our platform helps
            you track, manage, and optimize your stock in real-time whether
            you're a small shop or a large-scale distributor. Say goodbye to
            paperwork and start managing smarter with our intuitive,
            cloud-powered dashboard. Enjoy everything with just a single click!
          </p>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google icon"
            />
            Login with Google
          </button>
        </div>
        <div className="login-image">
          <img
            src="https://cdn.dribbble.com/users/331265/screenshots/14805882/media/264e4b6501e12b8be08c8e98fcf53505.png"
            alt="Inventory Illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
