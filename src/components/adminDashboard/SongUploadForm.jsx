import React, { useState, useRef } from "react";
import api from "../../utils/axios";

// ✅ Utility to create slug from title
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// ✅ Predefined genre options
const GENRE_OPTIONS = [
  "Afrobeats",
  "Hip-Hop",
  "Pop",
  "R&B",
  "Jazz",
  "Gospel",
  "Classical",
  "Rock",
  "Electronic"
];

const SongUploadForm = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Refs for file inputs
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !artist || !audio || !genre) {
      alert("Please provide title, artist, genre, and audio file.");
      return;
    }
    try {
      setLoading(true);

      const slug = generateSlug(title); // ✅ auto-generate slug

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("albumName", albumName);
      formData.append("genre", genre);
      formData.append("description", description);
      formData.append("slug", slug);
      formData.append("audio", audio);
      if (image) formData.append("coverImage", image);

      const res = await api.post("/mnb/api/createSong", formData);

      console.log("Song uploaded:", res.data);
      alert("✅ Song uploaded successfully!");

      // ✅ Clear form fields
      setTitle("");
      setArtist("");
      setAlbumName("");
      setGenre("");
      setDescription("");
      setImage(null);
      setAudio(null);

      if (audioInputRef.current) audioInputRef.current.value = null;
      if (imageInputRef.current) imageInputRef.current.value = null;
    } catch (err) {
      console.error("Failed to upload song:", err);
      alert(`❌ Failed to upload song: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">Upload New Song</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Song Title*</label>
          <input
            type="text"
            placeholder="e.g. My New Track"
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#959A4A]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Artist */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Artist*</label>
          <input
            type="text"
            placeholder="e.g. Olusola"
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#959A4A]"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        {/* Album */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Album Name</label>
          <input
            type="text"
            placeholder="e.g. The Golden Hour"
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#959A4A]"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Genre*</label>
          <select
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#959A4A]"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Select a Genre</option>
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            placeholder="Short description about the song"
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#959A4A]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        {/* Audio */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Audio File*</label>
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            className="border rounded w-full p-2 file:mr-2 file:py-1 file:px-3 file:border-none file:bg-[#959A4A] file:text-white file:cursor-pointer"
            onChange={(e) => setAudio(e.target.files[0])}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="border rounded w-full p-2 file:mr-2 file:py-1 file:px-3 file:border-none file:bg-[#959A4A] file:text-white file:cursor-pointer"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Preview */}
        {image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(image)}
              alt="Cover Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#959A4A] text-white py-2 rounded hover:bg-violet-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </form>
    </div>
  );
};

export default SongUploadForm;
