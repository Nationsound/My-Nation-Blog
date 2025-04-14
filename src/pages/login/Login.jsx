import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError("Email and password are required.");
      return;
    }
  
    console.log('Credentials:', credentials);
  
    try {
      const response = await fetch('http://localhost:1990/mnb/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);  // Log the error message from the backend
        setError(errorData.message || 'Login failed');
        return;
      }
  
      const data = await response.json();
      console.log('Data received after login:', data);
  
      if (data.token) {
        localStorage.setItem('accessToken', data.token); // Save token
      } else {
        console.error('No token received in login response');
      }
  
      localStorage.setItem('role', data.role);
  
      // Reload the page to reflect the updated localStorage
      window.location.reload(); 
  
      // Redirect based on role after reloading
      navigate(data.role === "admin" ? "/admin" : "/profile");
     
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred while logging in');
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {error && <p className="error">{error}</p>}
          <input type="submit" value="Login" />
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        <Link className="forgot-password" to="/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
};

export default Login;
