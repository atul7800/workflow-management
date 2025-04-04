import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./styles/LoginForm.css";
import logo_highbridge from "../assets/logo_highbridge.png";

export function SignupForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", user.email);

      navigate("/workflows");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="vision-container">
          <div className="high-bridge-logo">
            <img src={logo_highbridge} alt="logo_highbridge" />
          </div>
          <div className="vision">
            <h2>Join Us Today</h2>
            <p>
              Be part of something amazing. Create your account and explore
              workflows.
            </p>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form">
          <h5>WELCOME!</h5>
          <h2>Create a New Account</h2>
          <form onSubmit={handleSignup}>
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
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-type password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>
          <p className="signup-text">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              LOG IN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
