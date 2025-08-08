import React, { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { toast } from "react-toastify";

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

const SongUpdateDelete = ({ slug, onSongUpdated, onSongDeleted }) => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ✅ Pagination state
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  // ✅ Fetch paginated songs
  const fetchSongs = async (page = 1) => {
    try {
      const res = await api.get(`/mnb/api/getAllSongs?page=${page}&limit=${limit}`);
      setSongs(res.data.songs);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to fetch songs list");
    }
  };

  // ✅ Fetch song by slug
  const fetchSongBySlug = async () => {
    try {
      const res = await api.get(`/mnb/api/getSongBySlug/${slug}`);
      setSong(res.data);
    } catch {
      toast.error("Failed to fetch song details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (slug) fetchSongBySlug();
  }, [slug]);

  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await api.put(`/mnb/api/updateSong/${slug}`, song);
      toast.success("Song updated successfully");
      onSongUpdated?.(res.data);
      fetchSongs(currentPage);
    } catch {
      toast.error("Failed to update song");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    setDeleting(true);
    try {
      await api.delete(`/mnb/api/deleteSong/${slug}`);
      toast.success("Song deleted successfully");
      onSongDeleted?.(slug);
      fetchSongs(currentPage);
    } catch {
      toast.error("Failed to delete song");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading song details...</p>;

  return (
    <div>
      {/* Pagination */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Song List</h2>
        <ul className="space-y-1">
          {songs.map((s) => (
            <li key={s._id} className="border p-2 rounded">
              {s.title} — {s.artist}
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* Update/Delete */}
      {song ? (
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Update Song</h2>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              name="title"
              value={song.title || ""}
              onChange={handleChange}
              placeholder="Song Title"
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              name="artist"
              value={song.artist || ""}
              onChange={handleChange}
              placeholder="Artist"
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              name="albumName"
              value={song.albumName || ""}
              onChange={handleChange}
              placeholder="Album Name"
              className="border p-2 w-full rounded"
            />
            <select
              name="genre"
              value={song.genre || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Genre</option>
              {GENRE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              value={song.description || ""}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              name="releaseDate"
              value={song.releaseDate ? song.releaseDate.split("T")[0] : ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />

            <button
              type="submit"
              disabled={updating}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {updating ? "Updating..." : "Update Song"}
            </button>
          </form>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {deleting ? "Deleting..." : "Delete Song"}
          </button>
        </div>
      ) : (
        <p>No song found for this slug</p>
      )}
    </div>
  );
};

export default SongUpdateDelete;
