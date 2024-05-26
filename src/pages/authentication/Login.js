import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import UserDTO from "../../dto/UserDTO";
import { useLoading } from "../../components/app-loader/LoadingContext";

export default function Login() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [email, setEmail] = useState(''); // Added state for email
  const [password, setPassword] = useState(''); // Added state for password
  const { setLoading } = useLoading();


  const login = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const current_user = new UserDTO(user.uid, user.displayName, user.email);
      setRedirectToHome(true);
      setLoading(false)
      alert('Signed In Successfully')
    } catch (error) {
      alert('Error signing in');
      setLoading(false)
    }
  }

  if (redirectToHome) {
    console.log("Redirecting to home..."); // Added log message for debugging
    return <Navigate to="/home" />;
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={login}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="textField-label">
            <label>Email address</label><br />
            <input
              type="email"
              className="textField-input"
              placeholder="Enter email"
              value={email} // Added value attribute to bind email state
              onChange={(e) => setEmail(e.target.value)} // Added onChange handler to update email state
            />
          </div>
          <div className="textField-label">
            <label>Password</label><br />
            <input
              type="password"
              className="textField-input"
              placeholder="Enter password"
              value={password} // Added value attribute to bind password state
              onChange={(e) => setPassword(e.target.value)} // Added onChange handler to update password state
            />
          </div>
          <div className="Auth-form-title">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            <Link to="/forgot-password">
              Forgot password?
            </Link>
          </p>
          <p className="text-center mt-2">
            <Link to="/register">
              Don't have an account? Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
