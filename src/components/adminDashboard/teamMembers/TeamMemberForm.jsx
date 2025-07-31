import React, { useState } from 'react';
import api from '../../../utils/axios';
import './TeamMemberForm.css'; 

const TeamMemberForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    quote: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      const res = await api.post('/mnb/api/teamMember', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Team member added:', res.data);
      alert('Team member added successfully!'); // or use toast
      setForm({ name: '', role: '', quote: '', linkedin: '', twitter: '', instagram: '', image: null });

      if (onSuccess) onSuccess(); // e.g., to refresh list in parent
    } catch (error) {
      console.error('❌ Error adding team member:', error);
      alert('Failed to add team member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="team-form" onSubmit={handleSubmit}>
      <h2>Add Team Member</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />

      <textarea
        name="quote"
        placeholder="Quote"
        value={form.quote}
        onChange={handleChange}
      />

      <input
        type="url"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={form.linkedin}
        onChange={handleChange}
      />

      <input
        type="url"
        name="twitter"
        placeholder="Twitter URL"
        value={form.twitter}
        onChange={handleChange}
      />

      <input
        type="url"
        name="instagram"
        placeholder="Instagram URL"
        value={form.instagram}
        onChange={handleChange}
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Member'}
      </button>
    </form>
  );
};

export default TeamMemberForm;
