import React, { useState } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (image) {
      data.append('image', image);
    }

    try {
      await axios.post('http://localhost:1990/mnb/api/admins', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅ Admin created successfully!');
      setIsSuccess(true);
      // Reset form
      setFormData({ name: '', email: '', password: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create admin');
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8 hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-[#959A4A] mb-4">Create New Admin</h2>

      {message && (
        <p className={`mb-4 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Profile Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-[#959A4A] text-white px-4 py-2 rounded hover:bg-[#7e823c] transition"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
