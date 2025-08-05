import React, { useState, useEffect } from 'react';
import api from '../../../utils/axios'; 

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminAdverts = () => {
  const [adverts, setAdverts] = useState([]);
  const [newAdvert, setNewAdvert] = useState({
    title: '', description: '', link: '', facebook: '', instagram: '', twitter: '', linkedin: ''
  });
  const [newImage, setNewImage] = useState(null);
  const [selectedAdvert, setSelectedAdvert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    fetchAdverts();
  }, []);

  const fetchAdverts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/mnb/api/getAdverts');
      setAdverts(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load adverts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(newAdvert).forEach(key => formData.append(key, newAdvert[key]));
      if (newImage) formData.append('image', newImage);

      const res = await api.post('/mnb/api/adverts', formData);
      setAdverts([...adverts, res.data]);
      setNewAdvert({ title: '', description: '', link: '', facebook: '', instagram: '', twitter: '', linkedin: '' });
      setNewImage(null);
      setMessage('Advert created successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create advert');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(selectedAdvert).forEach(key => formData.append(key, selectedAdvert[key]));
      if (editImage) formData.append('image', editImage);

      const res = await api.put(`/mnb/api/updateAdvert/${id}`, formData);
      setAdverts(adverts.map(a => (a._id === id ? res.data : a)));
      setSelectedAdvert(null);
      setEditImage(null);
      setMessage('Advert updated successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update advert');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/mnb/api/deleteAdvert/${id}`);
      setAdverts(adverts.filter(a => a._id !== id));
      setMessage('Advert deleted successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete advert');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${baseURL.replace(/\/$/, '')}/${image.replace(/^\/+/, '')}`;
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Advert Management</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {loading && <p className="text-gray-500 mb-2">Processing...</p>}

      {/* Create Advert */}
      <div className="border p-4 mb-6 rounded">
        <h3 className="font-semibold mb-2">Create Advert</h3>
        {['title', 'description', 'link', 'facebook', 'instagram', 'twitter', 'linkedin'].map(field => (
          <input
            key={field}
            type={field === 'description' ? 'textarea' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border mb-2 p-2 w-full"
            value={newAdvert[field]}
            onChange={(e) => setNewAdvert({ ...newAdvert, [field]: e.target.value })}
          />
        ))}
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="mb-2" />
        <button onClick={handleCreate} className="bg-[#959A4A] hover:bg-violet-600 text-white px-4 py-2 rounded">Create</button>
      </div>

      {/* All Adverts */}
      <h3 className="font-semibold mb-2">All Adverts</h3>
      {adverts.map(advert => (
        <div key={advert._id} className="border p-4 rounded mb-2">
          <h4 className="font-bold">{advert.title}</h4>
          <p>{advert.description}</p>
          {advert.imageUrl && (
            <img src={getImageUrl(advert.imageUrl)} alt={advert.title} className="w-32 mt-2 object-cover" />
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {advert.link && <a href={advert.link} target="_blank" className="text-blue-600 underline">Link</a>}
            {advert.facebook && <a href={advert.facebook} target="_blank" className="text-blue-600 underline">Facebook</a>}
            {advert.instagram && <a href={advert.instagram} target="_blank" className="text-pink-600 underline">Instagram</a>}
            {advert.twitter && <a href={advert.twitter} target="_blank" className="text-sky-600 underline">Twitter</a>}
            {advert.linkedin && <a href={advert.linkedin} target="_blank" className="text-sky-600 underline">Linkedin</a>}
          </div>
          <div className="mt-2 space-x-2">
            <button onClick={() => setSelectedAdvert(advert)} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(advert._id)} className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}

      {/* Edit Advert */}
      {selectedAdvert && (
        <div className="border p-4 mt-4 rounded">
          <h3 className="font-semibold mb-2">Edit Advert</h3>
          {['title', 'description', 'link', 'facebook', 'instagram', 'twitter', 'linkedin'].map(field => (
            <input
              key={field}
              type={field === 'description' ? 'textarea' : 'text'}
              className="border mb-2 p-2 w-full"
              value={selectedAdvert[field]}
              onChange={(e) => setSelectedAdvert({ ...selectedAdvert, [field]: e.target.value })}
            />
          ))}
          <input type="file" onChange={(e) => setEditImage(e.target.files[0])} className="mb-2" />
          <button onClick={() => handleUpdate(selectedAdvert._id)} className="bg-[#959A4A] hover:bg-violet-600 text-white px-4 py-2 rounded">Update</button>
          <button onClick={() => setSelectedAdvert(null)} className="ml-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminAdverts;
