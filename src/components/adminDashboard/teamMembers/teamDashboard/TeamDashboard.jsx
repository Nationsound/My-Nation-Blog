import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMemberForm from '../TeamMemberForm';
import './TeamDashboard.css';

const API_URL = 'http://localhost:1990/mnb/api';

const TeamDashboard = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // for editing
  const [editForm, setEditForm] = useState(null);             // edit form state
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/teamMembers`, {
        params: { page, limit, search }
      });
      setTeamMembers(res.data.members || res.data);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [page, search]);

  // When edit button clicked: populate editForm state
  const startEdit = (member) => {
    setSelectedMember(member);
    setEditForm({
      name: member.name,
      role: member.role,
      quote: member.quote,
      linkedin: member.linkedin,
      twitter: member.twitter,
      instagram: member.instagram,
      image: null // keep existing unless user uploads new
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditForm({ ...editForm, image: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      const formData = new FormData();
      Object.keys(editForm).forEach((key) => {
        if (editForm[key]) formData.append(key, editForm[key]);
      });

      await axios.put(`${API_URL}/teamMember/${selectedMember._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Team member updated successfully!');
      fetchTeam();
      setSelectedMember(null);
      setEditForm(null);
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('Failed to update team member');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    try {
      await axios.delete(`${API_URL}/teamMember/${id}`);
      alert('Team member deleted successfully!');
      fetchTeam();
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="dashboard-container">
      <h1>Team Management Dashboard</h1>

      {/* Form to add new member */}
      <TeamMemberForm
        onSuccess={() => {
          fetchTeam();
          setSelectedMember(null);
        }}
        onCancel={() => setSelectedMember(null)}
      />

      {/* Form to edit existing member */}
      {selectedMember && editForm && (
        <form className="team-form" onSubmit={handleUpdateSubmit}>
          <h2>Edit Team Member</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editForm.name}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={editForm.role}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="quote"
            placeholder="Quote"
            value={editForm.quote}
            onChange={handleEditChange}
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={editForm.linkedin}
            onChange={handleEditChange}
          />
          <input
            type="url"
            name="twitter"
            placeholder="Twitter URL"
            value={editForm.twitter}
            onChange={handleEditChange}
          />
          <input
            type="url"
            name="instagram"
            placeholder="Instagram URL"
            value={editForm.instagram}
            onChange={handleEditChange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleEditChange}
          />

          <div className="form-buttons">
            <button type="submit">Update Member</button>
            <button type="button" className="cancel-btn" onClick={() => setSelectedMember(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="search-pagination-container">
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="search-input"
        />
      </div>

      <h2>Team Members</h2>
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div className="team-list">
          {teamMembers.map((member) => (
            <div key={member._id} className="team-item">
              <img
                src={member.image?.startsWith('/uploads')
                  ? `${API_URL.replace('/mnb/api', '')}${member.image}`
                  : member.image}
                alt={member.name}
                className="team-item-image"
              />
              <div className="team-item-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <small>{member.quote}</small>
              </div>
              <button onClick={() => startEdit(member)}>Edit</button>
              <button onClick={() => handleDelete(member._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          ◀ Previous
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={page >= totalPages}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default TeamDashboard;
