import "./Login.css";
import { Link,Navigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../../firebase";
import {  signInWithEmailAndPassword   } from 'firebase/auth';

export default function Login() {
  const [redirectToHome, setRedirectToHome] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const login = (e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setRedirectToHome(true);  
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}
if (redirectToHome) {
  return <Navigate to="/home" />;
}
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={login}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="textField-label">
              <label>Email address</label><br/>
              <input
                type="email"
                className="textField-input"
                placeholder="Enter email"
                onChange={(e)=>setEmail(e.target.value)}
              />
              <div className="textField-label">
            <label>Password</label><br/>
            <input
              type="password"
              className="textField-input"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
            </div>
          <div className="Auth-form-title">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          <Link to = "/login">
               Forgot password?
              </Link>
          </p>
          <p className="text-center mt-2">
          <Link to = "/register">
          Don't have an account, Sign Up
              </Link>
          </p>
        </div>
      </form>
    </div>
  );
}