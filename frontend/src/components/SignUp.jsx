import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../api/url';
import axios from 'axios';

function SignUp() {

  const navigate = useNavigate(); 

  const [data, setData] = useState({
    username:'',
    password:'',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    try {
      const response = await axios.post(url.registerUrl, data);
      console.log("post user register", response.data);
      if (response.data.status == "failure") {
        setErrorMessage(response.data.message);
      } else navigate("/");
    } catch (error) {
      console.error("post user register error", error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div id="signup-container">
      <h2>Signup</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form id="signup-form">
        <label htmlFor="signup-username">Username:</label>
        <input
          type="text"
          id="signup-username"
          value={data.username}
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e.target.value }))
          }
          autoComplete='on'
          required
        />

        <label htmlFor="signup-password">Password:</label>
        <input
          type="password"
          id="signup-password"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
          autoComplete='on'
          required
        />
        <button type="submit" onClick={handleSubmit}>Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/" id="show-signin">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUp