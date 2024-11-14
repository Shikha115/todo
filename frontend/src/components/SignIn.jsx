import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div id="signin-container">
      <h2>Signin</h2>
      <form id="signin-form">
        <label for="signin-username">Username:</label>
        <input type="text" id="signin-username" required />
        <label for="signin-password">Password:</label>
        <input type="password" id="signin-password" required />
        <button type="submit">Signin</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" id="show-signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
