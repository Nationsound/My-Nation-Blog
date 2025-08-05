import React, { useState, useEffect } from "react";
import api from "../../utils/axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ArtistUploadForm = () => {
  const [formData, setFormData] = useState({ name: "", genre: "", image: null });
  const [artists, setArtists] = useState([]);
  const [editArtistId, setEditArtistId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", genre: "", image: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await api.get("/mnb/api/getAllArtist");
      setArtists(res.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("genre", formData.genre);
    data.append("image", formData.image);

    try {
      const res = await api.post("/mnb/api/addArtist", data);
      setMessage(res.data.message || "Artist uploaded successfully!");
      setFormData({ name: "", genre: "", image: null });
      fetchArtists();
    } catch (error) {
      console.error(error);
      setMessage("Error uploading artist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/mnb/api/deleteArtist/${id}`);
      setMessage("Artist deleted successfully!");
      fetchArtists();
    } catch (error) {
      console.error(error);
      setMessage("Error deleting artist.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditFormData({ ...editFormData, [name]: files ? files[0] : value });
  };

  const handleEditSubmit = async (id) => {
    const data = new FormData();
    data.append("name", editFormData.name);
    data.append("genre", editFormData.genre);
    if (editFormData.image) data.append("image", editFormData.image);

    try {
      await api.put(`/mnb/api/updateArtist/${id}`, data);
      setMessage("Artist updated successfully!");
      setEditArtistId(null);
      fetchArtists();
    } catch (error) {
      console.error(error);
      setMessage("Error updating artist.");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Artist Name"
          value={formData.name}
          onChange={handleChange}
          className="w-[540px] border p-2 rounded"
          required
        />
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-[540px] border p-2 rounded"
          required
        >
          <option value="">Select Genre</option>
          <option value="Afrobeats">Afrobeats</option>
          <option value="Alté">Alté</option>
          <option value="Afro-fusion">Afro-fusion</option>
          <option value="Hip-Pop/Rap">Hip-Pop/Rap</option>
          <option value="Ragae">Ragae</option>
          <option value="Hardcore-Rap">Hardcore-Rap</option>
          <option value="R & B">R & B</option>
        </select>
        <div>
          <label className="block text-sm font-medium">Upload Artist Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-[540px] border p-2 rounded"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#959A4A] text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Artist"}
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>

      <h2 className="text-xl font-semibold">Artists</h2>
<ul className="space-y-4">
  {artists.map((artist) => {
    // Normalize backslashes and build image URL
    const getImageUrl = (path) => {
  if (!path) return '';
  const isCloudinary = path.startsWith('http://') || path.startsWith('https://');
  const normalizedPath = path.replace(/\\/g, '/');
  return isCloudinary
    ? normalizedPath
    : `${baseURL.replace(/\/$/, '')}/${normalizedPath}`;
};


    return (
      <li key={artist._id} className="border p-4 rounded">
        {editArtistId === artist._id ? (
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
              className="border p-1 rounded w-full"
            />
            <select
              name="genre"
              value={editFormData.genre}
              onChange={handleEditChange}
              className="border p-1 rounded w-full"
            >
              <option value="">Select Genre</option>
              <option value="Afrobeats">Afrobeats</option>
              <option value="Alté">Alté</option>
              <option value="Afro-fusion">Afro-fusion</option>
            </select>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleEditChange}
              className="border p-1 rounded w-full"
            />
            <button
              onClick={() => handleEditSubmit(artist._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditArtistId(null)}
              className="ml-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{artist.name}</p>
              <p className="text-sm text-gray-600">{artist.genre}</p>
              {artist.imageUrl && (
                <img
  src={getImageUrl(artist.imageUrl)}
  alt={artist.name}
  className="w-24 h-24 object-cover mt-2"
/>

              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditArtistId(artist._id);
                  setEditFormData({ name: artist.name, genre: artist.genre, image: null });
                }}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(artist._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </li>
    );
  })}
</ul>

    </div>
  );
};

export default ArtistUploadForm;
