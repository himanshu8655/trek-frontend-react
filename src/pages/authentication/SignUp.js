import "./SignUp.css";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import {  createUserWithEmailAndPassword   } from 'firebase/auth';
import React, { useState } from "react";

export default function SignUp() {
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = (event) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setRedirectToLogin(true)
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  };

  if(redirectToLogin){
    return <Navigate to="/login" />;
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={register}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register Here!</h3>
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
          <div className="text-center">
   <Link to = "/login" className="link-primary">
                Already have an account, Sign In
              </Link>
          </div>
        </div>
      </form>
    </div>
  );
}