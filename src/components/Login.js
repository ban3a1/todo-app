import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
export default function Login() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    axios
      .post(`${BASE_URL}/login`, user)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        navigate("/todo");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form className="d-flex flex-column gap-3 w-25" style={{}}>
        <h2 className="text-center">Login</h2>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error + "!"}
          </div>
        )}
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className={`form-control`}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="d-flex w-100 justify-content-between">
          <Link to="/signup">Sign up</Link>
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
