import React, { useState } from "react";
import axios from "axios";

const ArtistUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("genre", formData.genre);
    data.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/artists", data); // Replace with your actual backend route
      setMessage(response.data.message || "Artist uploaded successfully!");

      setFormData({
        name: "",
        genre: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      setMessage("Error uploading artist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Artist Name */}
      <input
        type="text"
        name="name"
        placeholder="Artist Name"
        value={formData.name}
        onChange={handleChange}
        className="w-[540px] border p-2 rounded"
        required
      />

      {/* Genre Select */}
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
      </select>

      {/* Image Upload */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Artist"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default ArtistUploadForm;
