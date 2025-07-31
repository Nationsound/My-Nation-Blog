import React, { useEffect, useState } from 'react';
import api from '../../../utils/axios';
import './AdminList.css';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');
  const [editAdmin, setEditAdmin] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', image: null });

  // Fetch admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get('/mnb/api/admins');
        setAdmins(res.data);
      } catch (error) {
        console.error('Failed to fetch admins', error);
        setMessage('❌ Failed to fetch admins');
      }
    };
    fetchAdmins();
  }, []);

  // Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      await api.delete(`/mnb/api/admins/${id}`);
      setAdmins(prev => prev.filter(admin => admin._id !== id));
      setMessage('✅ Admin deleted successfully');
    } catch (error) {
      console.error('Delete failed', error);
      setMessage('❌ Failed to delete admin');
    }
  };

  // Open edit modal
  const openEditModal = (admin) => {
    setEditAdmin(admin);
    setEditForm({ name: admin.name, email: admin.email, image: null });
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('email', editForm.email);
      if (editForm.image) formData.append('image', editForm.image);

      const res = await api.put(`/mnb/api/admins/${editAdmin._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAdmins(prev =>
        prev.map(admin => (admin._id === editAdmin._id ? res.data : admin))
      );
      setMessage('✅ Admin updated successfully');
      setEditAdmin(null);
    } catch (error) {
      console.error('Update failed', error);
      setMessage('❌ Failed to update admin');
    }
  };

  return (
    <div className="admin-list-container mt-6">
      <h2 className="text-xl font-semibold text-[#959A4A] mb-4">All Admins</h2>
      {message && <p className="mb-4">{message}</p>}
      <table className="w-full border-collapse shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-[#959A4A] text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
           const imageUrl = admin.image
  ? `${baseURL.replace(/\/$/, '')}/uploads/${admin.image}`
  : '';


            return (
              <tr key={admin._id} className="text-center border-b">
                <td className="p-2">{admin.name}</td>
                <td className="p-2">{admin.email}</td>
                <td className="p-2">
                  {admin.image ? (
                    <img
                      src={imageUrl}
                      alt={admin.name}
                      width="40"
                      height="40"
                      className="rounded-full mx-auto"
                    />
                  ) : 'No image'}
                </td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(admin)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit modal */}
      {editAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow w-80"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Admin</h3>
            <div className="mb-2">
              <label className="block text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">New Image (optional)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleEditChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditAdmin(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-[#959A4A] text-white rounded hover:bg-[#7e823c]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminList;
