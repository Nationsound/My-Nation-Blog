import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
  // Define success state
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1990/mnb/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Signup result:', result);
      
      if (response.status === 409) {
        alert('Email already exists. Please use a different one.');
      } else if (response.ok) {
        setSuccess(true); // Show success message
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="signup-container">
      {success ? (
        <div className="signup-success">
          <h2>Signup Successful 🎉</h2>
          <p>Welcome to My Nation Blog! Your account has been created.</p>
          <Link to="/login" className="hover:text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <input type="submit" value="Sign Up" />
          <p>
            Already have an account?{' '}
            <Link to="/login" className="hover:text-gray-300 transition duration-200">
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
