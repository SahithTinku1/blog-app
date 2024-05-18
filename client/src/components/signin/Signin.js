import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isPending,
    currentUser,
    loginUserStatus,
    errorOccurred,
    errMsg,
  } = useSelector((state) => state.userAuthoruserAuthorLoginReducer);

  const onLoginFormSubmit = (userCred) => {
    dispatch(userAuthorLoginThunk(userCred));
  };

  useEffect(() => {
    if (loginUserStatus) {
      navigate(currentUser.userType === "user" ? "/user-profile" : "/author-profile");
    }
  }, [loginUserStatus]);

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>
        {errorOccurred && <p className="error-message">{errMsg}</p>}
        <form onSubmit={handleSubmit(onLoginFormSubmit)}>
          <div className="form-group">
            <label htmlFor="userType" className="signin-label">
              Login as
            </label>
            <div className="radio-group">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="author"
                  value="author"
                  {...register("userType")}
                />
                <label htmlFor="author" className="form-check-label">
                  Author
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="user"
                  value="user"
                  {...register("userType")}
                />
                <label htmlFor="user" className="form-check-label">
                  User
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="signin-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...register("username")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="signin-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password")}
            />
          </div>
          <button type="submit" className="signin-button">
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
