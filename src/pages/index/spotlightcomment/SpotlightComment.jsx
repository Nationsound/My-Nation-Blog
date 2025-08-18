import React, { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SpotlightComment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState(localStorage.getItem("spotlightName") || "");
  const [email, setEmail] = useState(localStorage.getItem("spotlightEmail") || "");
  const [rating, setRating] = useState(0);

  // 🔹 For replies
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");

  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`${baseURL}/mnb/api/style-spotlight/comments`);
        setComments(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load comments");
      }
    };
    fetchComments();
  }, []);

  // ✅ Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !email.trim()) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await api.post(`${baseURL}/mnb/api/style-spotlight/comment`, {
        name,
        email,
        content: newComment,
        rating,
      });
      setComments([res.data, ...comments]);
      setNewComment("");
      setRating(0);
      localStorage.setItem("spotlightName", name);
      localStorage.setItem("spotlightEmail", email);
      toast.success("Comment added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment.");
    }
  };

  // ✅ Reply handler
  const handleReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim() || !replyName.trim() || !replyEmail.trim()) {
      toast.error("All reply fields are required!");
      return;
    }
    try {
      const res = await api.post(
        `${baseURL}/mnb/api/style-spotlight/comment/${parentId}/reply`,
        {
          name: replyName,
          email: replyEmail,
          content: replyText,
        }
      );
      setComments(
        comments.map((c) =>
          c._id === parentId
            ? { ...c, replies: [...(c.replies || []), res.data] }
            : c
        )
      );
      setReplyingTo(null);
      setReplyText("");
      setReplyName("");
      setReplyEmail("");
      toast.success("Reply added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post reply.");
    }
  };

  // ✅ Like / Dislike handler
  const handleReaction = async (id, type, parentId = null) => {
    try {
      const res = await api.patch(
        `${baseURL}/mnb/api/style-spotlight/comment/${id}/reaction`,
        { type }
      );
      if (parentId) {
        setComments(
          comments.map((c) =>
            c._id === parentId
              ? {
                  ...c,
                  replies: c.replies.map((r) => (r._id === id ? res.data : r)),
                }
              : c
          )
        );
      } else {
        setComments(comments.map((c) => (c._id === id ? res.data : c)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

      {/* ✅ Always show comment form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full mb-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 w-full mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Write your comment..."
          className="border p-2 w-full mb-2 rounded"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        {/* ⭐ Rating */}
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="bg-[#959A4A] text-white px-4 py-2 rounded hover:bg-violet-600 transition"
        >
          Post Comment
        </button>
      </form>

      {/* ✅ Comments list */}
      <div>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="border-b py-3">
              <p className="font-semibold">
                {c.name}{" "}
                <span className="text-sm text-gray-400">({c.email})</span>
              </p>
              <p className="text-sm text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </p>
              <p className="mt-1">{c.content}</p>
              {/* ⭐ Display Rating */}
              <div className="flex items-center text-yellow-500">
                {"★".repeat(c.rating)}{" "}
                <span className="text-gray-400 ml-1">
                  {5 - c.rating > 0 ? "☆".repeat(5 - c.rating) : ""}
                </span>
              </div>

              {/* 👍👎 + Reply */}
              <div className="flex items-center gap-4 mt-2 text-sm">
                <button
                  onClick={() => handleReaction(c._id, "like")}
                  className="text-blue-500 hover:underline"
                >
                  👍 {c.likes}
                </button>
                <button
                  onClick={() => handleReaction(c._id, "dislike")}
                  className="text-red-500 hover:underline"
                >
                  👎 {c.dislikes}
                </button>
                <button
                  onClick={() => setReplyingTo(c._id)}
                  className="text-green-500 hover:underline"
                >
                  Reply
                </button>
              </div>

              {/* ✅ Reply form */}
              {replyingTo === c._id && (
                <form onSubmit={(e) => handleReply(e, c._id)} className="mt-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 w-full mb-2 rounded"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 w-full mb-2 rounded"
                    value={replyEmail}
                    onChange={(e) => setReplyEmail(e.target.value)}
                  />
                  <textarea
                    className="border p-2 w-full mb-2 rounded"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                  >
                    Post Reply
                  </button>
                </form>
              )}

              {/* ✅ Replies */}
              {c.replies && c.replies.length > 0 && (
                <div className="ml-6 mt-3 space-y-2">
                  {c.replies.map((r) => (
                    <div key={r._id} className="border-l-2 pl-3">
                      <p className="font-semibold">
                        {r.name}{" "}
                        <span className="text-sm text-gray-400">({r.email})</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                      <p className="mt-1">{r.content}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <button
                          onClick={() => handleReaction(r._id, "like", c._id)}
                          className="text-blue-500 hover:underline"
                        >
                          👍 {r.likes}
                        </button>
                        <button
                          onClick={() =>
                            handleReaction(r._id, "dislike", c._id)
                          }
                          className="text-red-500 hover:underline"
                        >
                          👎 {r.dislikes}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SpotlightComment;
