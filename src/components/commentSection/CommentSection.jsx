import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { FaRegThumbsUp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentSection from "../commentSection/CommentSection"; // adjust path if needed

const UploadedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/mnb/api/getAllSongs");
      setSongs(res.data);
    } catch (err) {
      console.error("Failed to fetch songs:", err);
      toast.error("Failed to load songs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleLike = async (song) => {
    try {
      await api.put(`/mnb/api/updateSong/${song._id}`, {
        likes: song.likes + 1,
      });
      toast.success("Liked!");
      fetchSongs();
    } catch (err) {
      console.error("Failed to like:", err);
      toast.error("Failed to like the song.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center">Uploaded Songs</h2>

      {loading ? (
        <p className="text-center">Loading songs...</p>
      ) : songs.length === 0 ? (
        <p className="text-center">No songs uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {songs.map((song) => (
            <div key={song._id} className="border rounded shadow bg-white p-3 space-y-2">
              <img
                src={song.coverImage ? `https://app.mynationblog.fun/${song.coverImage}` : "/default-cover.jpg"}
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
                  <source src={`https://app.mynationblog.fun/${song.audioUrl}`} type="audio/mpeg" />
                </audio>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>👍 {song.likes || 0} likes</span>
                <span>💬 {song.comments?.length || 0} comments</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLike(song)}
                  className="flex items-center gap-1 px-2 py-1 bg-[#959A4A] text-white rounded hover:bg-violet-600"
                >
                  <FaRegThumbsUp /> Like
                </button>
              </div>

              {/* ✅ Use the reusable comment section */}
              <CommentSection itemId={song._id} comments={song.comments} apiBase="song" onCommentAdded={fetchSongs} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedSongs;
