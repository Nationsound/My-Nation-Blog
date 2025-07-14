import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegThumbsUp, FaRegCommentDots, FaTimes, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:1990/mnb/api/getAllSongs");
      const songsWithDefaults = res.data.map(song => ({
        ...song,
        comments: song.comments || [],
        likes: song.likes || 0
      }));
      setSongs(songsWithDefaults);
    } catch (err) {
      console.error("Failed to fetch songs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleLike = async (song) => {
    try {
      await axios.patch(`http://localhost:1990/mnb/api/likeSong/${song._id}`);
      toast.success("Liked!");
      fetchSongs();
    } catch (err) {
      console.error("Failed to like:", err);
      toast.error("Failed to like the song.");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:1990/mnb/api/addComment/${selectedSong._id}`,
        {
          text: newComment,
          username: newUsername.trim() || "Anonymous"
        }
      );
      toast.success("Comment added!");
      setNewComment('');
      setNewUsername('');

      setSongs(prevSongs =>
        prevSongs.map(song =>
          song._id === selectedSong._id
            ? { ...song, comments: [...song.comments, res.data] }
            : song
        )
      );
      setSelectedSong(prev =>
        prev ? { ...prev, comments: [...prev.comments, res.data] } : prev
      );
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment.");
    }
  };

  const handleDeleteComment = (idx) => {
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song._id === selectedSong._id
          ? { ...song, comments: song.comments.filter((_, i) => i !== idx) }
          : song
      )
    );
    setSelectedSong(prev =>
      prev ? { ...prev, comments: prev.comments.filter((_, i) => i !== idx) } : prev
    );
    toast.success("Comment deleted!");
  };

  // Pagination logic
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const paginatedSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center">Uploaded Songs</h2>

      {loading ? (
        <p className="text-center">Loading songs...</p>
      ) : songs.length === 0 ? (
        <p className="text-center">No songs uploaded yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedSongs.map((song) => (
              <div key={song._id} className="border rounded shadow bg-white p-3 space-y-2">
                <img
                  src={song.coverImage ? `http://localhost:1990/${song.coverImage}` : "/default-cover.jpg"}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-gray-600">Artist: {song.artist}</p>
                {song.description && <p className="text-gray-700">{song.description}</p>}
                <p className="text-xs text-gray-400">
                  Uploaded on {new Date(song.releaseDate).toLocaleDateString()}
                </p>
                {song.audioUrl && (
                  <audio controls className="w-full">
                    <source src={`http://localhost:1990/${song.audioUrl}`} type="audio/mpeg" />
                  </audio>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>👍 {song.likes} likes</span>
                  <span>💬 {song.comments.length} comments</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLike(song)}
                    className="flex items-center gap-1 px-2 py-1 bg-[#959A4A] text-white rounded hover:bg-violet-600"
                  >
                    <FaRegThumbsUp /> Like
                  </button>
                  <button
                    onClick={() => setSelectedSong(song)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    <FaRegCommentDots /> View Comments
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Prev
            </button>
            <span className="self-center">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Comments Modal */}
      {selectedSong && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-md w-full p-4 relative space-y-3">
            <button
              onClick={() => setSelectedSong(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-2">Comments for "{selectedSong.title}"</h3>

            {selectedSong.comments.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {selectedSong.comments.map((c, idx) => (
                  <li key={idx} className="border p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{c.username || "Anonymous"}</p>
                      <p>{c.text}</p>
                    </div>
                    <FaTrash
                      onClick={() => handleDeleteComment(idx)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}

            <div className="space-y-2 mt-2">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Name (optional)"
                className="border rounded w-full p-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="border rounded flex-1 p-2"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-[#959A4A] text-white px-3 py-2 rounded hover:bg-violet-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedSongs;
