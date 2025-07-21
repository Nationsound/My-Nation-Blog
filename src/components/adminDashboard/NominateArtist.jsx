// src/pages/NominateArtist.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NominateArtist = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);

      await axios.post('http://localhost:1990/mnb/api/spotlights', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Artist nominated successfully!');
      setFormData({ name: '', category: '', description: '', image: null });
    } catch (error) {
      console.error('Nomination failed:', error);
      toast.error('Failed to nominate artist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-[#959A4A] mb-6">Nominate an Artist</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4">
        <input
          type="text"
          placeholder="Artist Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea
          placeholder="Describe the style/outfit"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#959A4A] hover:bg-violet-600'} text-white py-2 rounded transition`}
        >
          {loading ? 'Submitting...' : 'Submit Nomination'}
        </button>
      </form>
    </div>
  );
};

export default NominateArtist;
