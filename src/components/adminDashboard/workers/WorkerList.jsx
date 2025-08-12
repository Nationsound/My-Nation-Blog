import React, { useEffect, useState } from 'react';
import api from '../../../utils/axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('uploads/') ? path : `uploads/${path}`;
  return `${baseURL.replace(/\/$/, '')}/${normalized}`;
};

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [message, setMessage] = useState('');
  const [editWorker, setEditWorker] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', photo: null });

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await api.get('/mnb/api/workers');
        setWorkers(res.data);
      } catch (error) {
        console.error('Failed to fetch workers', error);
        setMessage('❌ Failed to fetch workers');
      }
    };
    fetchWorkers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this worker?')) return;
    try {
      await api.delete(`/mnb/api/deleteWorker/${id}`);
      setWorkers((prev) => prev.filter((worker) => worker._id !== id));
      setMessage('✅ Worker deleted successfully');
    } catch (error) {
      console.error('Delete failed', error);
      setMessage('❌ Failed to delete worker');
    }
  };

  const openEditModal = (worker) => {
    setEditWorker(worker);
    setEditForm({ name: worker.name, role: worker.role, photo: null });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === 'photo' ? files[0] : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('role', editForm.role);
      if (editForm.photo) formData.append('photo', editForm.photo);

      const res = await api.put(`/mnb/api/updateWorker/${editWorker._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setWorkers((prev) =>
        prev.map((worker) =>
          worker._id === editWorker._id ? res.data : worker
        )
      );
      setMessage('✅ Worker updated successfully');
      setEditWorker(null);
    } catch (error) {
      console.error('Update failed', error);
      setMessage('❌ Failed to update worker');
    }
  };

  return (
    <div className="worker-list-container mt-6">
      <h2 className="text-xl font-semibold text-[#959A4A] mb-4">All Workers</h2>
      {message && <p className="mb-4">{message}</p>}

      <table className="w-full border-collapse shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-[#959A4A] text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">ID Number</th>
            <th className="p-2">Photo</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => {
            const photoUrl = getImageUrl(worker.photo);

            return (
              <tr key={worker._id} className="text-center border-b">
                <td className="p-2">{worker.name}</td>
                <td className="p-2">{worker.role}</td>
                <td className="p-2">{worker.idNumber}</td>
                <td className="p-2">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={worker.name}
                      width="40"
                      height="40"
                      className="rounded-full mx-auto object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/default-profile.png';
                      }}
                    />
                  ) : (
                    'No photo'
                  )}
                </td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(worker)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(worker._id)}
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

      {editWorker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow w-80"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Worker</h3>
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
              <label className="block text-sm">Role</label>
              <input
                type="text"
                name="role"
                value={editForm.role}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">New Photo (optional)</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleEditChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditWorker(null)}
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

export default WorkerList;
