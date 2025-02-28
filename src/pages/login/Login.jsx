import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
export default function Login() {
  return (
    <div>
       <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Login" />
        <p>
          Don't have an account? 
          
          <Link to="/signup" className="hover:text-gray-300 transition duration-200">Sign Up</Link>
        </p>
      </form>
    </div>
    </div>
  )
}
