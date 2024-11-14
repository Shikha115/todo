import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (

    <div id="signup-container">
    <h2>Signup</h2>
    <form id="signup-form">
        <label for="signup-username">Username:</label>
        <input type="text" id="signup-username" required />
        <label for="signup-password">Password:</label>
        <input type="password" id="signup-password" required />
        <button type="submit">Signup</button>
    </form>
    <p>
        Already have an account? <Link to="/login" id="show-signin">Sign In</Link>
    </p>
</div>
  )
}

export default SignUp