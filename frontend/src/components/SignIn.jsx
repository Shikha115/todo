import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../api/url";
import axios from "axios";

function SignIn() {

  const navigate = useNavigate(); 

  const [data, setData] = useState({
    username:'',
    password:'',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");

    try {
      const response = await axios.post(url.loginUrl, data);
      console.log("post user login", response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error("post user login error", error);
    }
    
  };
  return (
    <div id="signin-container">
      <h2>Signin</h2>
      <form id="signin-form">
        <label htmlFor="signin-username">Username:</label>
        <input
          type="text"
          id="signin-username"
          autoComplete='on'
          value={data.username}
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <label htmlFor="signin-password">Password:</label>
        <input
          type="password"
          id="signin-password"
          autoComplete='on'
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Signin
        </button>
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
