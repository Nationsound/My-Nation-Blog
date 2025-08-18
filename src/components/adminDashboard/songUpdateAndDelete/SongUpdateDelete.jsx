import React, { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SongUpdateDelete = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    audioFile: null,
    coverImageFile: null,
  });

  const genreOptions = [
    "Afrobeat",
    "Hip-Hop",
    "R&B",
    "Pop",
    "Jazz",
    "Gospel",
    "Reggae",
    "Country",
    "Rock",
    "Classical",
    "Electronic",
  ];

  // Fetch all songs
  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${baseURL}/mnb/api/getAllSongs`); 
      const fetchedSongs = Array.isArray(res.data)
        ? res.data
        : res.data?.songs || [];
      setSongs(fetchedSongs);
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("No songs found (404)");
      } else {
        toast.error("Failed to load songs");
      }
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Handle selecting a song for editing
  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setFormData({
      title: song.title || "",
      artist: song.artist || "",
      album: song.album || "",
      genre: song.genre || "",
      audioFile: null,       // reset file inputs on select
      coverImageFile: null,
    });
  };

  // Handle input change for text/select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [`${name}File`]: files[0],
      }));
    }
  };

  // Handle update with FormData (for files)
  const handleUpdate = async () => {
    if (!selectedSong) return toast.error("No song selected");

    try {
      const data = new FormData();

      // Append all non-file fields
      data.append("title", formData.title);
      data.append("artist", formData.artist);
      data.append("albumName", formData.album);
      data.append("genre", formData.genre);

      // Append files if selected
      if (formData.audioFile) {
        data.append("audio", formData.audioFile);
      }
      if (formData.coverImageFile) {
        data.append("coverImage", formData.coverImageFile);
      }

      await api.put(`${baseURL}/mnb/api/updateSong/${selectedSong.slug}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Song updated successfully");
      setSelectedSong(null);
      fetchSongs();
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Song not found (404)");
      } else {
        toast.error("Failed to update song");
      }
    }
  };

  // Handle delete
  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    try {
      await api.delete(`${baseURL}/mnb/api/deleteSong/${slug}`);
      toast.success("Song deleted successfully");
      fetchSongs();
      if (selectedSong?.slug === slug) setSelectedSong(null);
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Song not found (404)");
      } else {
        toast.error("Failed to delete song");
      }
    }
  };

  return (
    <div>
      <h2>Update / Delete Songs</h2>

      {loading && <p>Loading songs...</p>}

      {!loading && Array.isArray(songs) && songs.length > 0 ? (
        songs.map((song) => (
          <div key={song._id} style={{ marginBottom: "10px" }}>
            <span>
              {song.title} - {song.artist}
            </span>{" "}
            <button onClick={() => handleSelectSong(song)}>Edit</button>{" "}
            <button onClick={() => handleDelete(song.slug)}>Delete</button>
          </div>
        ))
      ) : (
        !loading && <p>No songs found.</p>
      )}

      {selectedSong && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Song</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
          />
          <input
            type="text"
            name="album"
            placeholder="Album"
            value={formData.album}
            onChange={handleChange}
          />
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="">Select Genre</option>
            {genreOptions.map((genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Audio upload */}
          <div>
            <label>Audio File (optional)</label>
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Cover image upload */}
          <div>
            <label>Cover Image (optional)</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setSelectedSong(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SongUpdateDelete;
