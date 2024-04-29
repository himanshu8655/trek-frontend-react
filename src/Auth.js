import "./Auth.css";
import { Redirect } from 'react-router-dom';

export default function Auth() {

const login1 = (event)=>{
  event.preventDefault();
}
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={login1}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="textField-label">
              <label>Email address</label><br/>
              <input
                type="email"
                className="textField-input"
                placeholder="Enter email"
              />
              <div className="textField-label">
            <label>Password</label><br/>
            <input
              type="password"
              className="textField-input"
              placeholder="Enter password"
            />
          </div>
            </div>
          <div className="Auth-form-title">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          <a href="#">Forgot password?</a>
          </p>
          <div className="text-center">
   <a href = "#" className="link-primary">
                Don't have an account, Sign Up
              </a>
          </div>
        </div>
      </form>
    </div>
  );
}