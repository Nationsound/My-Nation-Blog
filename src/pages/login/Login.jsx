import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import api from '../../utils/axios'; // ✅ import your configured axios instance

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
      const res = await api.post('/mnb/api/signIn', credentials, {
        withCredentials: true
      });

      const data = res.data;

      if (data.token) {
        localStorage.setItem('accessToken', data.token);
      }

      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);

      navigate(data.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');

    try {
      const res = await api.post('/mnb/api/request-password-reset', { email: resetEmail });

      setResetMessage(res.data.message || '✅ If this email is registered, a reset link has been sent.');
      setResetEmail('');
    } catch (err) {
      console.error('Reset request failed:', err);
      setResetMessage(err.response?.data?.message || '❌ Failed to send reset link.');
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
