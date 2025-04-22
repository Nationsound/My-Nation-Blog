import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);  // To handle the edit mode state
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });  // To manage form data when editing
  const [error, setError] = useState(null);  // To capture and display errors

  useEffect(() => {
    const fetchProfile = async () => {
      let data;
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await fetch('http://localhost:1990/mnb/api/getUserProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  // Ensure cookies are included with the request
        });

        if (!response.ok) {
          throw new Error('Unauthorized or invalid token');
        }

        data = await response.json();
        setProfile(data);  // Update profile state with the fetched data
        setFormData({ name: data.name, email: data.email });  // Populate form data with profile info
        console.log('User Profile:', data);  // Log profile data

      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      } finally {
        setLoading(false);  // Set loading to false when fetching is done
      }
    };

    fetchProfile();
  }, []); // Empty dependency array to run only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));  // Update the formData state
  };

  const updateProfile = async () => {
    try {
      const res = await fetch("http://localhost:1990/mnb/api/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),  // Send updated profile data
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      alert("Profile updated!");
      setEditMode(false);
      setProfile(data);  // Update profile with the new data
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  const deleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      const res = await fetch("http://localhost:1990/mnb/api/deleteUserProfile", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete profile.");
      alert("Profile deleted.");
      localStorage.clear();
      navigate("/login");  // Redirect to login page after deletion
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
      if (!res.ok) throw new Error("Signout failed");
      alert("Signed out.");
      localStorage.clear();
      navigate("/login");  // Redirect to login page after signout
    } catch (err) {
      console.error("Signout error:", err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;  // Show loading message while fetching

  if (!profile) return <p>Profile not found</p>;  // Show error if no profile is available

  return (
    <div className="profile-container">
      <h2>Welcome, {profile.name}</h2>

      {editMode ? (
        <>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button onClick={updateProfile}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Email:</strong> {profile.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}

      <button onClick={signOut}>Sign Out</button>
      <button onClick={deleteProfile} className="delete-button">Delete Profile</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Profile;
