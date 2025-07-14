import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import axios from 'axios';

const ResetPassword = ()=> {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetToken } = useParams(); // Get the resetToken from the URL params
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Optionally, you can validate the token on component mount by sending a request to your backend
    // to ensure the token is valid and hasn't expired.
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        {
          resetToken,
          newPassword: password,
        }
      );

      setSuccess('Password has been successfully reset');
      navigate('/login'); // Use navigate to redirect user to the login page
    } catch (err) {
      setError(err.response.data.message || 'Error resetting password');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Reset Your Password</h2>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

      <form onSubmit={handlePasswordReset}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">Reset Password</button>
      </form>
    </div>
  );
}
export default ResetPassword;
