import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:1990/mnb/api/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      if (data.token) {
        localStorage.setItem('accessToken', data.token);
      }

      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);

      navigate(data.role === 'admin' ? '/admin' : '/profile');

    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred while logging in.');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:1990/mnb/api/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setResetMessage(data.message || '✅ If this email is registered, a reset link has been sent.');
        setResetEmail('');
      } else {
        setResetMessage(data.message || '❌ Failed to send reset link.');
      }
    } catch (err) {
      console.error('Reset request failed:', err);
      setResetMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>

        {showResetForm ? (
          <form onSubmit={handleResetSubmit}>
            <input
              type="email"
              name="resetEmail"
              value={resetEmail}
              placeholder="Enter your email"
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            {resetMessage && <p className={resetMessage.startsWith('✅') ? 'success' : 'error'}>{resetMessage}</p>}
            <input type="submit" value="Request Reset Link" />
            <p style={{ marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                style={{ color: '#959A4A', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Back to Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
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
        )}

        {!showResetForm && (
          <>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <button
              type="button"
              className="forgot-password"
              onClick={() => { setShowResetForm(true); setError(''); }}
              style={{ color: '#959A4A', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}
            >
              Forgot password?
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
