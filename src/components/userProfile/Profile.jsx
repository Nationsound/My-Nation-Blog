import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log('User Profile:', data);  // Log profile data
    
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfile(data);
        setLoading(false);
      }
    };
    
    
    
    fetchProfile();
  }, [navigate]); // Empty dependency array to run the effect once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner while fetching data
  }

  if (!profile) {
    return <div>No profile found</div>; // Handle case when no profile data is returned
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateProfile = async () => {
    try {
      const res = await fetch("http://localhost:1990/mnb/api/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      alert("Profile updated!");
      setEditMode(false);
      fetchProfile();
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
      if (!res.ok) throw new Error("Signout failed");
      alert("Signed out.");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Signout error:", err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>; // Show loading message

  if (!profile) return <p>Profile not found</p>; // If profile is not available, show an error

  return (
    <div className="profile-container">
      <h2>Welcome, {profile.name}</h2>

      {editMode ? (
        <>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
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
}

export default Profile;
