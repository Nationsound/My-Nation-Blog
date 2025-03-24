import React, { useState } from "react";
import axios from "axios";

const SongUploadForm = () => {
  const [formData, setFormData] = useState({
    artistName: "",
    title: "",
    descriptionTitle: "",
    description: "",
    graphicFile: null,
    audioFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("artistName", formData.artistName);
    data.append("title", formData.title);
    data.append("descriptionTitle", formData.descriptionTitle);
    data.append("description", formData.description);
    data.append("graphicFile", formData.graphicFile);
    data.append("audioFile", formData.audioFile);

    try {
      const response = await axios.post("http://localhost:5000/api/songs", data);
      setMessage(response.data.message || "Song uploaded successfully!");
      setFormData({
        artistName: "",
        title: "",
        descriptionTitle: "",
        description: "",
        graphicFile: null,
        audioFile: null,
      });
    } catch (error) {
      setMessage("Error uploading song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Artist Name */}
      <input
        type="text"
        name="artistName"
        placeholder="Artist Name"
        value={formData.artistName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Song Title */}
      <input
        type="text"
        name="title"
        placeholder="Song Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Description Title */}
      <input
        type="text"
        name="descriptionTitle"
        placeholder="Description Title"
        value={formData.descriptionTitle}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Song Description */}
      <textarea
        name="description"
        placeholder="Song Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows="4"
      />

      {/* Song Graphic Upload */}
      <div>
        <label className="block text-sm font-medium">Upload Song Graphic (Image)</label>
        <input
          type="file"
          name="graphicFile"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          accept="image/*"
          required
        />
      </div>

      {/* Audio File Upload */}
      <div>
        <label className="block text-sm font-medium">Upload Audio File (MP3, WAV)</label>
        <input
          type="file"
          name="audioFile"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          accept="audio/*"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Song"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default SongUploadForm;
