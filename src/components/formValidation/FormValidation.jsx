import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

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
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
      const newComment = { ...response.data, ...formData, likes: 0, dislikes: 0, rating: 0 };
      updateLocalStorage([newComment, ...comments]);
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

  return (
    <div className="max-w-lg w-full mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
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
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Display Comments */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <p className="text-sm font-semibold">{comment.name} ({comment.email})</p>
            <p className="text-gray-700">{comment.message}</p>
            <div className="flex items-center gap-4 mt-2">
              <button onClick={() => handleInteraction(index, "like")} className="text-green-500">
                👍 {comment.likes}
              </button>
              <button onClick={() => handleInteraction(index, "dislike")} className="text-red-500">
                👎 {comment.dislikes}
              </button>
              <button onClick={() => handleInteraction(index, "rate")} className="text-yellow-500">
                ⭐ {comment.rating}/5
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactForm;
