import React, { useState, useRef } from "react";
import api from "../../utils/axios";

const SongUploadForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Refs for file inputs
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !artist || !audio) {
      alert('Please provide title, artist and audio file.');
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('description', description);
      formData.append('audio', audio);
      if (image) formData.append('coverImage', image);

      const res = await api.post('/mnb/api/createSong', formData);

      console.log('Song uploaded:', res.data);
      alert('✅ Song uploaded successfully!');

      // ✅ Clear form fields
      setTitle('');
      setArtist('');
      setDescription('');
      setImage(null);
      setAudio(null);

      // ✅ Clear file input values
      if (audioInputRef.current) audioInputRef.current.value = null;
      if (imageInputRef.current) imageInputRef.current.value = null;

    } catch (err) {
      console.error('Failed to upload song:', err);
      alert(`❌ Failed to upload song: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">Upload New Song</h2>

      <form onSubmit={handleUpload} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Audio File*</label>
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}   // ✅ attach ref
            className="border rounded w-full p-2 file:mr-2 file:py-1 file:px-3 file:border-none file:bg-[#959A4A] file:text-white file:cursor-pointer"
            onChange={(e) => setAudio(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}   // ✅ attach ref
            className="border rounded w-full p-2 file:mr-2 file:py-1 file:px-3 file:border-none file:bg-[#959A4A] file:text-white file:cursor-pointer"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(image)}
              alt="Cover Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#959A4A] text-white py-2 rounded hover:bg-violet-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Song'}
        </button>
      </form>
    </div>
  );
};

export default SongUploadForm;
