import React, { useState, useEffect } from 'react';
import api from '../../../utils/axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminSpotlightManager = () => {
  const [spotlights, setSpotlights] = useState([]);
  const [editData, setEditData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchSpotlights();
  }, []);

  const fetchSpotlights = async () => {
    try {
      const res = await api.get('/mnb/api/getAllSpotlights'); 
      setSpotlights(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch spotlights');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this spotlight?')) return;
    try {
      await api.delete(`/mnb/api/spotlights/${id}`);
      toast.success('Deleted successfully');
      fetchSpotlights();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleEditClick = (spotlight) => {
    setEditData(spotlight);
    setPreviewImage(`${baseURL}/${spotlight.image.replace(/\\/g, '/')}`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('description', editData.description);
      formData.append('category', editData.category);
      if (imageFile) formData.append('image', imageFile);

      await api.put(`/mnb/api/spotlights/${editData._id}`, formData);
      toast.success('Spotlight updated');
      setEditData(null);
      fetchSpotlights();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${baseURL.replace(/\/$/, '')}/${image.replace(/^\/+/, '')}`;
};

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#959A4A]">Manage Style Spotlights</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotlights.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-[#959A4A]">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
            encType="multipart/form-data"
          >
            <h2 className="text-2xl font-bold text-[#959A4A]">Edit Spotlight</h2>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Name"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Description"
            />
            <select
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div>
              <label className="block text-sm font-medium">Current Image</label>
              <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded mt-1" />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditData(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSpotlightManager;
