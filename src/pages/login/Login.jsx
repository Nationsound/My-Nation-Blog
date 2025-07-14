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

  try {
    const response = await fetch('http://localhost:1990/mnb/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Login failed:', data.message);
      setError(data.message || 'Login failed');
      return;
    }

    console.log('Login response:', data); // ✅ check what's returned

    // ✅ Save token if backend sends it
    if (data.token) {
      localStorage.setItem('accessToken', data.token);
    } else {
      console.warn('No token received in login response');
    }

    // Optionally save role/email
    localStorage.setItem('role', data.role);
    localStorage.setItem('email', data.email);

    // Redirect to profile or admin dashboard
    navigate(data.role === 'admin' ? '/admin' : '/profile');

  } catch (err) {
    console.error('Error logging in:', err);
    setError('An error occurred while logging in.');
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
