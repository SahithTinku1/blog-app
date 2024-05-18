import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function onSignUpFormSubmit(userObj) {
    try {
      const res = await axios.post("http://localhost:4000/user-api/user", userObj);
      if (res.status === 201) {
        setSignupSuccess(true);
        setErr("");
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-title">
          {signupSuccess ? (
            <>
              <p className="signup-success-message">User registration successful!</p>
              <p className="signup-redirect-text">Proceed to <Link to="/signin">Login</Link></p>
              <p className="signup-redirect-text">Back to <Link to="/">Home</Link></p>
            </>
          ) : (
            <h2 className="signup-heading">Sign Up</h2>
          )}
        </div>
        <div className="signup-body">
          {err && <p className="signup-error-message">{err}</p>}
          {!signupSuccess && (
            <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
              <div className="signup-form-group">
                <label htmlFor="userType" className="signup-label">Register as</label>
                <div className="signup-radio-group">
                  <div className="signup-radio-item">
                    <input
                      type="radio"
                      className="signup-radio-input"
                      id="author"
                      value="author"
                      {...register("userType")}
                    />
                    <label htmlFor="author" className="signup-radio-label">Author</label>
                  </div>
                  <div className="signup-radio-item">
                    <input
                      type="radio"
                      className="signup-radio-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label htmlFor="user" className="signup-radio-label">User</label>
                  </div>
                </div>
              </div>
              <div className="signup-form-group">
                <label htmlFor="username" className="signup-label">Username</label>
                <input
                  type="text"
                  className="signup-input"
                  id="username"
                  {...register("username")}
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="password" className="signup-label">Password</label>
                <input
                  type="password"
                  className="signup-input"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="email" className="signup-label">Email</label>
                <input
                  type="email"
                  className="signup-input"
                  id="email"
                  {...register("email")}
                />
              </div>
              <button type="submit" className="signup-button">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
