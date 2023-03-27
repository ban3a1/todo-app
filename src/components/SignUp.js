import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateUser } from "../validation";

export default function SignUp() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState();
  const [readyToSend, setReadyToSend] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    validateUser(user, setErrors, setReadyToSend);
  };

  useEffect(() => {
    const user = { email, password };
    if (readyToSend) {
      axios
        .post(`${BASE_URL}/register`, user)
        .then((result) => {})
        .catch((er) => {
          setEmailError("There is such an email already");
          console.log(emailError);
        });
    }
  }, [readyToSend]);
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form className="d-flex flex-column gap-3 w-25" style={{}}>
        <h2 className="text-center">Sign up</h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"} ${
              emailError && "is-invalid"
            }`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="invalid-feedback">
            {emailError ? emailError : errors.email}
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="d-flex w-100 justify-content-between">
          <Link to="/">Login</Link>
          <Link to="/forgotpassword">Forgot your password?</Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
