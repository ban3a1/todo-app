import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form className="d-flex flex-column gap-3 w-25" style={{}}>
        <h2 className="text-center">Reset your password</h2>
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
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
