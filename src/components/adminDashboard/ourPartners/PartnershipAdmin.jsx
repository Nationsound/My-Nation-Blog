import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PartnershipAdmin.css'; // style separately if you want

const PartnershipAdmin = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', message: '' });

  const fetchPartners = async () => {
    try {
      const res = await fetch('http://localhost:1990/mnb/api/partnerships');
      if (!res.ok) throw new Error('Failed to fetch partners');
      const data = await res.json();
      setPartners(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load partners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    try {
      const res = await fetch(`http://localhost:1990/mnb/api/partnership/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Partner deleted');
      setPartners(partners.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (partner) => {
    setEditingId(partner._id);
    setEditData({ name: partner.name, email: partner.email, message: partner.message });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:1990/mnb/api/partnership/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('Partner updated');
      setEditingId(null);
      fetchPartners();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update');
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Partnership Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : partners.length === 0 ? (
        <p>No partnership requests found.</p>
      ) : (
        <motion.div 
          className="partners-list" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          {partners.map(partner => (
            <motion.div 
              key={partner._id} 
              className="partner-card"
              whileHover={{ scale: 1.02 }}
            >
              {editingId === partner._id ? (
                <>
                  <input 
                    value={editData.name} 
                    onChange={e => setEditData({ ...editData, name: e.target.value })} 
                  />
                  <input 
                    value={editData.email} 
                    onChange={e => setEditData({ ...editData, email: e.target.value })} 
                  />
                  <textarea 
                    value={editData.message} 
                    onChange={e => setEditData({ ...editData, message: e.target.value })} 
                  />
                  <div className="action-buttons">
                    <button onClick={handleUpdate} className="update-btn">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h4>{partner.name}</h4>
                  <p><strong>Email:</strong> {partner.email}</p>
                  <p><strong>Message:</strong> {partner.message}</p>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(partner)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(partner._id)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PartnershipAdmin;
