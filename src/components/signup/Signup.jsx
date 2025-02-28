import React from 'react'
import { Link } from 'react-router-dom';
import './SignUp.css'
export default function SignUp() {
  return (
    <div>
      <div className="signup-container">
        <form className="signup-form">
          <h2>Sign Up</h2>
          <input type="text" placeholder="Username" required />
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Middle Name" optional />
          <input type="text" placeholder="Last Name" required />
          <input type="text" placeholder="Date of Birth" required />
          <select name="sex" id="type" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="text" placeholder="Email" required />
          <input type="text" placeholder="Password" required />
          <input type="text" placeholder="Nationality" />
          <input type="password" placeholder="State of Origin" required />
          <input type="submit" value="SignUp" />
          <p>
            already have an account?
            <Link to="/login" className="hover:text-gray-300 transition duration-200">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
