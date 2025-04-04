import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginForm.css";
import logo_highbridge from "../assets/logo_highbridge.png";
import fb from "../assets/fb.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (!password.trim()) {
      alert("Password cannot be empty");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    navigate("workflows");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="vision-container">
          <div className="high-bridge-logo">
            <img src={logo_highbridge} alt="logo_highbridge" />
          </div>
          <div className="vision">
            <h2>Building the Future...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form">
          <h5>WELCOME BACK!</h5>
          <h2>Log In to your Account</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Type here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Type here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="remember-me">
              <span>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </span>

              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <div className="social-login">
            <button className="google socialBtn">
              <span>
                <img src={google} alt="Google login" />
                <span>Log In with Google</span>
              </span>
            </button>
            <button className="facebook socialBtn">
              <span>
                <img src={fb} alt="FB login" />
                <span>Log In with Facebook</span>
              </span>
            </button>
            <button className="apple socialBtn">
              <span>
                <img src={apple} alt="Apple login" />
                <span>Log In with Apple</span>
              </span>
            </button>
          </div>
          <p className="signup-text">
            New User? <a href="#">SIGN UP HERE</a>
          </p>
        </div>
      </div>
    </div>
  );
}
