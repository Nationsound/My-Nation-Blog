import React, { useState, useEffect } from "react";
import api from "../../utils/axios";

const ContactForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // adjust as needed

  // Load comments from localStorage on mount
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(savedComments);
  }, []);

  // Update localStorage when comments change
  const updateLocalStorage = (updatedComments) => {
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/mnb/api/contacts", formData);
      const newComment = { ...response.data, ...formData, likes: 0, dislikes: 0, rating: 0 };
      updateLocalStorage([newComment, ...comments]);
      onFormSubmit(newComment);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInteraction = (index, type) => {
    const updatedComments = [...comments];
    if (type === "like") {
      updatedComments[index].likes += 1;
    } else if (type === "dislike") {
      updatedComments[index].dislikes += 1;
    } else if (type === "rate") {
      updatedComments[index].rating = Math.min(updatedComments[index].rating + 1, 5);
    }
    updateLocalStorage(updatedComments);
  };

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(comments.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-lg w-full mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#959A4A]">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#959A4A]">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#959A4A]">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#959A4A] text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Display Comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <>
            {currentComments.map((comment, index) => (
              <div
                key={startIndex + index}
                className="border p-4 rounded shadow bg-gray-100"  // background color
              >
                <p className="text-sm font-semibold">{comment.name} ({comment.email})</p>
                <p className="text-gray-700">{comment.message}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button onClick={() => handleInteraction(startIndex + index, "like")} className="text-green-500 bg-[#959A4A]">
                    👍 {comment.likes}
                  </button>
                  <button onClick={() => handleInteraction(startIndex + index, "dislike")} className="text-red-500 bg-[#959A4A]">
                    👎 {comment.dislikes}
                  </button>
                  <button onClick={() => handleInteraction(startIndex + index, "rate")} className="text-yellow-500 bg-[#959A4A]">
                    ⭐ {comment.rating}/5
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Prev
              </button>
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
