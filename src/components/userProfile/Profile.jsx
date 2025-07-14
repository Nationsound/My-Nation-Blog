import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', email: '', age: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:1990/mnb/api/getUserProfile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch profile');
      }

      const data = await res.json();
      setProfile(data);
      setFormData({
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        age: data.age || ''
      });
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:1990/mnb/api/updateUserProfile/${profile._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      showToast("Profile updated!");
      setProfile(data);
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  const deleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:1990/mnb/api/deleteUserProfile/${profile._id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete profile.");
      showToast("Profile deleted.");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  const signOut = async () => {
    try {
      const res = await fetch("http://localhost:1990/mnb/api/signOut", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Sign out failed");
      showToast("Signed out.");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Sign out error:", err);
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center mt-10">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!profile) return <p className="text-center mt-10">Profile not found</p>;

  return (
    <motion.div 
      className="profile-container max-w-md mx-auto p-6 bg-white rounded shadow space-y-3"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
          {profile.firstName?.[0] || 'U'}
        </div>
      </div>

      <h2 className="text-xl font-bold text-center mb-4">
        Welcome, {profile.firstName} {profile.middleName} {profile.lastName}
      </h2>

      {editMode ? (
        <>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />

          <div className="flex justify-between">
            <motion.button 
              whileTap={{ scale: 0.95 }} 
              onClick={updateProfile}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </motion.button>
          </div>
        </>
      ) : (
        <div className="space-y-1">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Age:</strong> {profile.age || "N/A"}</p>
          <motion.button 
            whileTap={{ scale: 0.95 }} 
            onClick={() => setEditMode(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </motion.button>
        </div>
      )}

      <motion.button 
        whileTap={{ scale: 0.95 }} 
        onClick={signOut}
        className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Sign Out
      </motion.button>

      <motion.button 
        whileTap={{ scale: 0.95 }} 
        onClick={deleteProfile}
        className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Profile
      </motion.button>

      {error && <p className="text-center text-red-500">{error}</p>}

      {toast.message && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded text-white 
            ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {toast.message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;
